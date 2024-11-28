#!/bin/bash


install_node(){
    echo "Update the System."
    sudo yum update -y

    echo "Install the required build tools."
    sudo yum groupinstall 'Development Tools' -y

    echo "Installing Node.js..."
    curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
    sudo yum install -y nsolid

    echo "Verify Node.js installation."
    node -v && npm -v
}


install_git(){
    echo "Installing Git..."
    sudo yum install -y git
}


check_node(){
    echo "Checking for Node.js..."
    if ! command -v node &> /dev/null
    then
        echo "Node.js not found."
        install_node
    else
        echo "Node.js is already install."
    fi
}


check_git(){
    echo "Checking for Git..."
    if ! command -v git &> /dev/null
    then
        echo "Git not found."
        install_git
    else
        echo "Git is already install."
    fi
}


setup_project(){

    check_node

    
    check_git

    cd CS360_Project

    #Install backend project dependencies
    cd backend

    # Create .env file backend
    if [ ! -f .env ]; then
        echo "Creating .env file..."
        touch .env

        # Set fixed values for HOST and PORT
        echo "HOST=0.0.0.0" >> .env
        echo "PORT=1337" >> .env

        # Generate random values for other environment variables
        APP_KEYS=$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)
        API_TOKEN_SALT=$(openssl rand -base64 16)
        ADMIN_JWT_SECRET=$(openssl rand -base64 16)
        TRANSFER_TOKEN_SALT=$(openssl rand -base64 16)
        DATABASE_FILENAME=".tmp/data_$(date +%s).db"
        JWT_SECRET=$(openssl rand -base64 32)

        # Write the rest of the environment variables to .env
        echo "APP_KEYS=$APP_KEYS" >> .env
        echo "API_TOKEN_SALT=$API_TOKEN_SALT" >> .env
        echo "ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET" >> .env
        echo "TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT" >> .env
        echo "# Database" >> .env
        echo "DATABASE_CLIENT=sqlite" >> .env
        echo "DATABASE_FILENAME=$DATABASE_FILENAME" >> .env
        echo "JWT_SECRET=$JWT_SECRET" >> .env
    else
        echo ".env file already exists."
    fi

    echo "Installing backend project dependencies..."
    npm install

    #Install client project dependencies
    cd ..
    cd client

    # Create .env file in client
    if [ ! -f .env ]; then
        echo "Creating .env file in client..."
        touch .env

        # Generate random values for client .env
        REACT_APP_STRIPE_APP_KEY=$(openssl rand -hex 32)
        PUBLIC_IP=$(curl -s ifconfig.me)  # ดึง IP สาธารณะ
        REACT_APP_DEV_URL="http://$PUBLIC_IP:1337"  # ใช้ IP สาธารณะใน URL
        REACT_APP_STRIPE_PUBLISHABLE_KEY=$(openssl rand -hex 32)

        # Write values to client/.env
        echo "REACT_APP_STRIPE_APP_KEY=$REACT_APP_STRIPE_APP_KEY" >> .env
        echo "REACT_APP_DEV_URL=$REACT_APP_DEV_URL" >> .env
        echo "REACT_APP_STRIPE_PUBLISHABLE_KEY=$REACT_APP_STRIPE_PUBLISHABLE_KEY" >> .env
    else
        echo "client/.env file already exists."
    fi

    echo "Installing client project dependencies..."
    npm install

    echo "Project setup completed."

}
setup_project