FROM debian:10.10-slim

WORKDIR /kataszter

COPY ./static/ ./static
COPY ./config.yml ./config.yml
COPY ./builds/kataszter-backend_linux ./backend

EXPOSE 8080

CMD ["./backend"]
