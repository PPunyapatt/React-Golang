# Use the Go 1.22.3 base image
FROM golang:1.22.3-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of your Go source code
COPY . .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Start a new lightweight image from Alpine
FROM alpine:latest

# Set working directory
WORKDIR /app

# Copy the built Go binary from the previous stage
COPY --from=build /app/main .

# Expose the application port (if needed)
EXPOSE 8777

# Run the Go binary
CMD ["./main"]
