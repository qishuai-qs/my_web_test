#!/bin/bash

# 根据参数判断环境,默认为开发环境
ENV=${1:-development}

case $ENV in
  production)
    echo "Starting in production mode..."
    docker-compose -f docker-compose.prod.yml up -d --build
    ;;
  development|*)
    echo "Starting in development mode..."
    docker-compose up
    ;;
esac