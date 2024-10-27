#!/bin/bash

#install Node.js and npm
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

#Install Git
install_git(){
    echo "Installing Git..."
    sudo yum install -y git
}

#Check for Node.js and npm
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

#Check for Git
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

#Install PM2 runtime
Install_pm2() {
    echo "Installing PM2..."
    sudo npm install pm2@latest -g

    echo "Configuring ecosystem.config.js file..."
    pm2 init

    echo "Creating ecosystem.config.js..."
    cat <<EOL > ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: '/home/ec2-user/CS360_Project/backend',
      script: 'npm',
      args: 'start',
      env: {
        APP_KEYS: 'WClWO74fuhZx1LJF+lNmFw==,gDcSr2p1bMaENJ82cbN9VA==,2SXED6C6p0RxGQMf/SHH6g==,X+sMy1DzMTVjnZ7SCWJybg==',
        API_TOKEN_SALT: 'gaD8QX66LWUlDD8HGRmhyA==',
        ADMIN_JWT_SECRET: 'N8ACvVAH79tAWYha5My34Q==',
        JWT_SECRET: 'qrjLUGQL3RAb9G/Knhwq6A==',
        NODE_ENV: 'production',
        DATABASE_CLIENT: 'sqlite',
        DATABASE_FILENAME: '.tmp/data.db'
      },
    },
  ],
};
EOL
    echo "PM2 installation and configuration complete."
}


#Setup Project
setup_project(){
    #Configuration Variables
    REPO_URL="https://github.com/techit6509650419/CS360_Project.git"

    #Check for Node.js and npm
    check_node

    #Check for Git
    check_git

    #Clone the project from GitHub
    echo "Cloning the repository form $REPO_URL..."
    git clone $REPO_URL
    cd CS360_Project

    #Install backend project dependencies
    cd backend
    echo "Installing backeend project dependencies..."
    npm install

    #Install client project denpendencies
    cd ..
    cd client
    echo "Installing client project dependencies..."
    npm install

    cd ..
    #install PM2 Runtime
    Install_pm2
    
    echo "Starting backend..."
    pm2 start ecosystem.config.js

    echo "Starting client..."
    cd client
    npm start

    echo "Project setup completed."

}

setup_project