# openssl to TLS/SSL

### generate private key

```sh
> openssl genrsa -out o.key 1024
```

### generate public key according to private key

```sh
> openssl rsa -in o.key -pubout -out o.pem
```