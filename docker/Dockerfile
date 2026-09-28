# Pinned so every server build uses the same Bun version as local dev/CI
# instead of whatever "latest" resolves to on a given day.
FROM oven/bun:1.3.14 AS builder

LABEL MAINTAINER="Temmi Pietsch <welcome@temmi.land>"

# Same reasoning as the apk upgrade in the final stage: the pinned Bun tag
# isn't rebuilt for every Debian security update (util-linux, openssl,
# sqlite, pcre2 CVEs etc.), so pull the patched packages at build time.
RUN apt-get update && \
	apt-get upgrade -y --no-install-recommends && \
	rm -rf /var/lib/apt/lists/*

COPY . /app

WORKDIR /app

RUN bun --version && \
	bun install --frozen-lockfile && \
	bun run build

FROM nginxinc/nginx-unprivileged:stable-alpine

LABEL maintainer="Temmi Pietsch <welcome@temmi.land>"

# The stable-alpine tag doesn't get rebuilt for every upstream Alpine
# security patch, so pull current package versions (curl/libcurl CVEs etc.)
# at build time instead of trusting whatever's baked into the base layer.
# apk needs root; the base image drops to the unprivileged "nginx" user by
# default, so switch back afterwards.
USER root
RUN apk update && apk upgrade --no-cache
USER nginx

COPY --from=builder /app/dist/ /usr/share/nginx/html/

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/security-headers.conf

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 93
