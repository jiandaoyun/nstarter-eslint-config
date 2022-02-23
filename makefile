docker-build:
	docker build --target=compile .

docker-release:
	docker build --target=release .

clean:
	rm -rf .npmrc report/

.PHONY: clean