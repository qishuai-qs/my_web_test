# 第一阶段: 构建前端
FROM node:18 as frontend-builder
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend .
RUN npm run build

# 第二阶段: 构建后端
FROM python:3.10-slim as backend-builder
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend .

# 最终阶段: 生产镜像
FROM python:3.10-slim
WORKDIR /app

# 复制已安装的Python依赖
COPY --from=backend-builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=backend-builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn

# 复制前后端构建结果
COPY --from=frontend-builder /app/dist /app/frontend/dist
COPY --from=backend-builder /app /app

# 环境变量
ENV PYTHONPATH=/app
ENV PORT=8000
ENV DATABASE_URL=sqlite:///./academic.db

EXPOSE ${PORT}
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--por