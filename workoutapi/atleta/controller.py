from fastapi import APIRouter, status, Body
from contrib.dependencies import DatabaseDependency
from atleta.schemas import AtletaIn, AtletaOut
from atleta.models import AtletaModel
from uuid import uuid4
from sqlalchemy.future import select

router = APIRouter()


@router.post(
    "/",
    summary="Cria novo Atleta",
    status_code=status.HTTP_201_CREATED,
    response_model=AtletaOut
)
async def post(
    db_session: DatabaseDependency,
    atleta_in: AtletaIn = Body(...)
) -> AtletaOut:
    atleta_out = AtletaOut(id=str(uuid4()), **atleta_in.model_dump())
    atleta_model = AtletaModel(**atleta_out.model_dump())
    
    db_session.add(atleta_model)
    await db_session.commit()
    
    return atleta_out

@router.get(
    "/",
    summary="Lista todos os atletas", 
    status_code=status.HTTP_200_OK,
    response_model=list[AtletaOut]
)
async def query(db_session: DatabaseDependency) -> list[AtletaOut]:
    atletas: list[AtletaOut] = (await db_session.execute(select(AtletaModel))).scalars().all() 
    return atletas