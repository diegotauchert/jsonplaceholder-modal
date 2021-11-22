deploy_dev:
	docker run --name pravaler -v $(PWD):/app -it -d -w /app -p 3006:3000 node:16.13.0
	docker exec pravaler yarn install
start:
	docker exec pravaler yarn start
install:
	docker exec pravaler yarn install