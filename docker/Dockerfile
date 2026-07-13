# Pinned so every server build uses the same Bun version as local dev/CI
# instead of whatever "latest" resolves to on a given day.
FROM oven/bun:1.3.14 AS builder

LABEL MAINTAINER="Temmi Pietsch <welcome@temmi.land>"

COPY . /app

WORKDIR /app

RUN bun --version && \
	bun install --frozen-lockfile && \
	bun run build

FROM nginxinc/nginx-unprivileged:stable-alpine

LABEL maintainer="Temmi Pietsch <welcome@temmi.land>"

COPY --from=builder /app/dist/ /usr/share/nginx/html/

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/security-headers.conf

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 93
