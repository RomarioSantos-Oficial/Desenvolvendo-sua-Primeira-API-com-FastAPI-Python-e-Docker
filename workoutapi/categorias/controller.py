from fastapi import APIRouter, HTTPException, status, Body
from contrib.dependencies import DatabaseDependency
from categorias.schemas import CategoriaIn, CategoriaOut
from categorias.models import CategoriaModel
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.post(
    "/",
    summary="Cria uma nova categoria",
    status_code=status.HTTP_201_CREATED,
    response_model=CategoriaOut,
)

async def post(
    db_session: DatabaseDependency,
    categoria_in: CategoriaIn = Body(...)
) -> CategoriaOut:
    
    # Verificar se categoria já existe
    existing_categoria = (await db_session.execute(
        select(CategoriaModel).filter_by(nome=categoria_in.nome)
    )).scalars().first()
    
    if existing_categoria:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f'Já existe uma categoria com nome: {categoria_in.nome}'
        )
    
    categoria_model = CategoriaModel(**categoria_in.model_dump())
    db_session.add(categoria_model)
    await db_session.commit()
    await db_session.refresh(categoria_model)
    
    return CategoriaOut.model_validate(categoria_model)

@router.get(
    "/", 
    summary="Lista todas as categorias",
    status_code=status.HTTP_200_OK,
    response_model=list[CategoriaOut]
)
async def query(db_session: DatabaseDependency) -> list[CategoriaOut]:  
    categorias: list[CategoriaModel] = (await db_session.execute(select(CategoriaModel))).scalars().all()

    return [CategoriaOut.model_validate(categoria) for categoria in categorias]

@router.get(
    "/{id}",
    summary="Recupera uma categoria pelo ID",
    status_code=status.HTTP_200_OK,
    response_model= CategoriaOut,
)
async def get_by_id(id: int, db_session: DatabaseDependency) -> CategoriaOut:
    categoria: CategoriaModel = (await db_session.execute(select(CategoriaModel).filter_by(id=id))).scalars().first()
    
    if not categoria:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Categoria não encontrada no ID {id}"
        )
    
    return CategoriaOut.model_validate(categoria)