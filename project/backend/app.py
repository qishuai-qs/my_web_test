from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="学术知识库API")

# 允许跨域
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# API路由
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# 挂载前端静态文件
app.mount("/", StaticFiles(directory="../frontend/dist", html=True), name="static")