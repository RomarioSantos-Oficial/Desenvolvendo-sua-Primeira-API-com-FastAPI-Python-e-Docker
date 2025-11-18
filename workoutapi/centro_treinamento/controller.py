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