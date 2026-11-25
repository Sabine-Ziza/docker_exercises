# AWS Emulator Hands-on Practice

## 1. Introduction

This repository documents my hands-on learning journey with **AWS Emulator, Docker, and AWS CLI**.

My goal is to understand AWS services through practical exercises, command-line operations, environment configuration, and troubleshooting.

## 2. Tools and Technologies

- Docker Desktop
- AWS Emulator
- AWS CLI
- Git and GitHub
- Git Bash
- Windows 11

## 3. Running AWS Emulator with Docker

### Build the Docker image

```bash
docker build -t aws-emulator .
```

### Run the emulator container

```bash
docker run -d --name aws-emulator \
  --memory=2g --memory-swap=2g \
  -p "127.0.0.1:9297:9297" \
  -v "$USERPROFILE/.aws/emulator:/home/emulator/.aws/emulator" \
  aws-emulator -p 9297
```

### Useful Docker commands

| Command | Description |
|---|---|
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker logs aws-emulator` | Display container logs |
| `docker stop aws-emulator` | Stop the container |

## 4. Checking Emulator Health

```bash
curl --cacert ~/.aws/emulator/9297/ca.pem \
  https://127.0.0.1:9297/__admin/health
```

Expected output:

```text
ok
```

## 5. Configuring AWS CLI

### Set environment variables

```bash
export AWS_ENDPOINT_URL="https://127.0.0.1:9297"
export AWS_SHARED_CREDENTIALS_FILE="$HOME/.aws/emulator/9297/emulator_credentials"
export AWS_CONFIG_FILE="$HOME/.aws/emulator/9297/config"
export AWS_CA_BUNDLE="$HOME/.aws/emulator/9297/ca.pem"
export AWS_EC2_METADATA_DISABLED=true
export AWS_DISABLE_HOST_PREFIX_INJECTION=true
export AWS_REGION=us-east-1
export AWS_DEFAULT_REGION=us-east-1
```

### Verify AWS CLI configuration

```bash
aws configure list
```

### Concepts learned

- `export` defines environment variables in Git Bash.
- `AWS_REGION` specifies the default AWS region.
- `AWS_ENDPOINT_URL` directs AWS CLI requests to the emulator.
- `AWS_SHARED_CREDENTIALS_FILE` specifies the credentials file.
- `$HOME` represents the Git Bash home directory.
- `.aws` is a hidden directory used for AWS configuration.

## 6. Amazon S3 Practice

**Amazon S3** is an object storage service.

### List existing buckets

```bash
aws s3api list-buckets
```

### Create a bucket

```bash
aws s3api create-bucket --bucket ziza-practice-bucket-2026
```

### Create a local text file

```bash
echo "Hello from AWS Emulator!" > hello.txt
```

### Read the file

```bash
cat hello.txt
```

## 7. Amazon DynamoDB Practice

**Amazon DynamoDB** is a fully managed NoSQL database service.

### List existing tables

```bash
aws dynamodb list-tables
```

### Retrieve an item

```bash
aws dynamodb get-item \
  --table-name Users \
  --key '{"userId": {"S": "user-001"}}'
```

### Concepts learned

- `get-item` retrieves an existing item.
- `--table-name` specifies the database table.
- `--key` identifies the item using its primary key.
- `S` represents a string data type.

## 8. Amazon SQS Practice

**Amazon SQS (Simple Queue Service)** is a message queuing service that allows applications to communicate asynchronously.

### Retrieve a queue URL

```bash
QUEUE_URL=$(
  aws sqs get-queue-url \
    --queue-name orders-queue \
    --query 'QueueUrl' \
    --output text
)
```

### Display the queue URL

```bash
echo "$QUEUE_URL"
```

### Concepts learned

- `get-queue-url` retrieves the queue URL.
- `$()` captures the output of a command.
- `--query` extracts specific information.
- `--output text` returns plain text.
- Bash variables store values for reuse.

## 9. Troubleshooting and Lessons Learned

During my practice, I encountered several issues and learned how to investigate them:

1. Docker could not connect to its engine when Docker Desktop was not running.
2. AWS CLI could not locate credentials when the environment was not configured.
3. AWS CLI commands require the correct parameters.
4. Git Bash multiline commands use `\` to continue onto another line.
5. Environment variables created using `export` need to be set again in a new terminal session.
6. Windows and Git Bash use different path formats.

## 10. Learning Objectives

- Understand Docker images and containers.
- Run an AWS Emulator locally.
- Configure AWS CLI.
- Practise Amazon S3, DynamoDB, and SQS.
- Understand environment variables and configuration files.
- Develop AWS CLI troubleshooting skills.

## 11. Progress

I will continue updating this repository as I complete more hands-on AWS exercises.

**Learning by doing, one AWS service at a time.**


