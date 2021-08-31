FROM ruby:3.0.2 as builder

WORKDIR /app
COPY . /app

RUN apt update && apt install -y build-essential libsqlite3-dev
RUN bundle install

FROM ruby:3.0.2

WORKDIR /app

COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY . /app

CMD ["rails", "server", "-b", "0.0.0.0"]
