# 第一阶段：前端构建阶段
# 使用Node 18作为基础镜像
FROM node:18 as frontend-builder  
# 设置工作目录
WORKDIR /app  
# 先拷贝依赖文件单独安装（利用Docker缓存层）
COPY frontend/package.json frontend/package-lock.json ./
# 安装npm依赖
RUN npm install  
# 拷贝前端源代码
COPY frontend .  
# 构建前端生产包
RUN npm run build  

# 第二阶段：后端构建阶段 
# 使用Python 3.10精简镜像
FROM python:3.10-slim as backend-builder  
WORKDIR /app
# 拷贝Python依赖文件
COPY backend/requirements.txt .  
# 安装Python依赖
RUN pip install --no-cache-dir -r requirements.txt  
# 拷贝后端源代码
COPY backend .  

# 最终阶段：生产镜像
# 最终使用精简Python镜像
FROM python:3.10-slim  
WORKDIR /app

# 从构建阶段复制已安装的依赖
COPY --from=backend-builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=backend-builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn

# 复制构建结果
# 前端静态文件
COPY --from=frontend-builder /app/dist /app/frontend/dist  
# 后端代码
COPY --from=backend-builder /app /app  

# 设置环境变量
# Python模块搜索路径
ENV PYTHONPATH=/app  
# 应用端口
ENV PORT=8000  
# 默认数据库配置
ENV DATABASE_URL=sqlite:///./academic.db  

# 声明暴露端口
EXPOSE ${PORT}  
# 启动命令
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "8000"]  