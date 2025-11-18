from fastapi import APIRouter, Body, HTTPException, status
from centro_treinamento.schemas import CentroTreinamentoIn, CentroTreinamentoOut
from centro_treinamento.models import CentroTreinamentoModel

from contrib.dependencies import DatabaseDependency
from sqlalchemy.future import select

router = APIRouter()

@router.post(
    '/', 
    summary='Criar um novo Centro de treinamento',
    status_code=status.HTTP_201_CREATED,
    response_model=CentroTreinamentoOut,
)
async def post(
    db_session: DatabaseDependency, 
    centro_treinamento_in: CentroTreinamentoIn = Body(...)
) -> CentroTreinamentoOut:
    
    # Verificar se centro de treinamento já existe
    existing_centro = (await db_session.execute(
        select(CentroTreinamentoModel).filter_by(nome=centro_treinamento_in.nome)
    )).scalars().first()
    
    if existing_centro:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f'Já existe um centro de treinamento com nome: {centro_treinamento_in.nome}'
        )
    
    centro_treinamento_model = CentroTreinamentoModel(**centro_treinamento_in.model_dump())
    
    db_session.add(centro_treinamento_model)
    await db_session.commit()
    await db_session.refresh(centro_treinamento_model)

    return CentroTreinamentoOut.model_validate(centro_treinamento_model)
    
    
@router.get(
    '/', 
    summary='Consultar todos os centros de treinamento',
    status_code=status.HTTP_200_OK,
    response_model=list[CentroTreinamentoOut],
)
async def query(db_session: DatabaseDependency) -> list[CentroTreinamentoOut]:
    centros_treinamento: list[CentroTreinamentoModel] = (
        await db_session.execute(select(CentroTreinamentoModel))
    ).scalars().all()
    
    return [CentroTreinamentoOut.model_validate(centro) for centro in centros_treinamento]


@router.get(
    '/{id}', 
    summary='Consulta um centro de treinamento pelo id',
    status_code=status.HTTP_200_OK,
    response_model=CentroTreinamentoOut,
)
async def get(id: int, db_session: DatabaseDependency) -> CentroTreinamentoOut:
    centro_treinamento: CentroTreinamentoModel = (
        await db_session.execute(select(CentroTreinamentoModel).filter_by(id=id))
    ).scalars().first()

    if not centro_treinamento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f'Centro de treinamento não encontrado no id: {id}'
        )
    
    return CentroTreinamentoOut.model_validate(centro_treinamento)


@router.patch(
    '/{id}',
    summary='Atualiza um centro de treinamento pelo id',
    status_code=status.HTTP_200_OK,
    response_model=CentroTreinamentoOut,
)
async def patch(id: int, db_session: DatabaseDependency, centro_in: CentroTreinamentoIn = Body(...)) -> CentroTreinamentoOut:
    centro_treinamento: CentroTreinamentoModel = (
        await db_session.execute(select(CentroTreinamentoModel).filter_by(id=id))
    ).scalars().first()

    if not centro_treinamento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f'Centro de treinamento não encontrado no id: {id}'
        )
    
    # Verificar se o novo nome já existe (se diferente do atual)
    if centro_in.nome != centro_treinamento.nome:
        existing_centro = (await db_session.execute(
            select(CentroTreinamentoModel).filter_by(nome=centro_in.nome)
        )).scalars().first()
        
        if existing_centro:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f'Já existe um centro de treinamento com nome: {centro_in.nome}'
            )
    
    centro_treinamento.nome = centro_in.nome
    centro_treinamento.endereco = centro_in.endereco
    centro_treinamento.proprietario = centro_in.proprietario
    
    await db_session.commit()
    await db_session.refresh(centro_treinamento)
    
    return CentroTreinamentoOut.model_validate(centro_treinamento)


@router.delete(
    '/{id}',
    summary='Deleta um centro de treinamento pelo id',
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete(id: int, db_session: DatabaseDependency) -> None:
    centro_treinamento: CentroTreinamentoModel = (
        await db_session.execute(select(CentroTreinamentoModel).filter_by(id=id))
    ).scalars().first()

    if not centro_treinamento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f'Centro de treinamento não encontrado no id: {id}'
        )
    
    # Verificar se existem atletas usando este centro
    from atleta.models import AtletaModel
    atletas_usando = (await db_session.execute(
        select(AtletaModel).filter_by(centro_treinamento_id=id)
    )).scalars().first()
    
    if atletas_usando:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Não é possível excluir o centro '{centro_treinamento.nome}' pois existem atletas vinculados a ele"
        )
    
    await db_session.delete(centro_treinamento)
    await db_session.commit()