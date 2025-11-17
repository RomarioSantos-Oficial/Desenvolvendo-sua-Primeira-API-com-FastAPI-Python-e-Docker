from fastapi import APIRouter
from atleta.controller import router as atleta
from categorias.controller import router as categoria
from centro_treinamento.controller import router as centro_treinamento

api_router = APIRouter()
api_router.include_router(atleta, prefix="/atleta", tags=["Atleta"])
api_router.include_router(categoria, prefix="/categoria", tags=["Categoria"])
api_router.include_router(centro_treinamento, prefix="/centro_treinamento", tags=["Centros_Treinamento"])