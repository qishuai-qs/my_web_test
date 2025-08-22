from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import Resource, get_db

router = APIRouter(prefix="/api/resources", tags=["资源管理"])

@router.get("/")
async def list_resources(db: Session = Depends(get_db)):
    return db.query(Resource).all()

@router.get("/{resource_id}")
async def get_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="资源不存在")
    return resource

@router.post("/")
async def create_resource(resource_data: dict, db: Session = Depends(get_db)):
    resource = Resource(**resource_data)
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource

@router.put("/{resource_id}")
async def update_resource(resource_id: int, resource_data: dict, db: Session = Depends(get_db)):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="资源不存在")
    
    for key, value in resource_data.items():
        setattr(resource, key, value)
    
    db.commit()
    return resource

@router.delete("/{resource_id}")
async def delete_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=404, detail="资源不存在")
    
    db.delete(resource)
    db.commit()
    return {"message": "资源删除成功"}
