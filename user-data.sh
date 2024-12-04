#!/bin/bash
# Update the package manager and install Docker
sudo yum update -y
sudo yum install -y docker

# Start Docker and enable it to start on boot
sudo service docker start
sudo systemctl enable docker

# Add the ec2-user to the Docker group (so you can run Docker commands without sudo)
sudo usermod -aG docker ec2-user
newgrp docker

echo "Starting Docker pull and run..."

sudo docker pull korakrit/cs360_frontend_image_test:latest
sudo docker run -d -p 3000:3000 --name cs360_frontend_container korakrit/cs360_frontend_image_test:latest
sudo docker exec cs360_frontend_container sh -c "
PUBLIC_IP=\$(curl -s ifconfig.me) &&
echo \"REACT_APP_STRIPE_APP_KEY=\$(openssl rand -hex 32)\" > /usr/src/app/.env &&
echo \"REACT_APP_DEV_URL=http://\$PUBLIC_IP:1337\" >> /usr/src/app/.env &&
echo \"REACT_APP_STRIPE_PUBLISHABLE_KEY=\$(openssl rand -hex 32)\" >> /usr/src/app/.env
echo "Exiting script..."
exit 0"
sudo docker exec cs360_frontend_container npm run build

sudo docker pull korakrit/cs360_backend_image_test:latest
sudo docker run -p 1337:1337 --name cs360_backend_container korakrit/cs360_backend_image_test:latest

echo "Docker containers are running."