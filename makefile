TOKEN ?=

docker-build:
	docker build --target=compile .

docker-release:
	docker build --target=release  --build-arg TOKEN="${TOKEN}" .

clean:
	rm -rf report/

.PHONY: clean