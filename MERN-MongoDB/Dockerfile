FROM ubuntu:jammy

# Set environment variables for non-interactive installation
ENV DEBIAN_FRONTEND=noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN=true

# Update and install required packages
RUN apt-get update -y && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    wget \
    curl \
    net-tools \
    nano \
    jq \
    cron \
    zip \
    unzip \
    software-properties-common \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    lsb-release \
    xdg-utils \
    libgbm1 \
    gnupg \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install pymongo
RUN python3 -m pip install --upgrade pip setuptools wheel && \
    python3 -m pip install pymongo

# Add MongoDB repository and install MongoDB
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --batch -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
RUN echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
RUN apt-get update && apt-get install -y mongodb-org mongodb-mongosh
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Create necessary directories with proper permissions
RUN mkdir -p /home/labDirectory /home/.evaluationScripts /var/log/mongodb /data/db && \
    chown -R mongodb:mongodb /data/db /var/log/mongodb

# Set default directory
RUN echo "cd /home/labDirectory" > /root/.bashrc
# COPY . /home/labDirectory/
# Set environment variables
ENV INSTRUCTOR_SCRIPTS="/home/.evaluationScripts"
ENV LAB_DIRECTORY="/home/labDirectory"
ENV PATH="/home/.evaluationScripts:${PATH}"
ENV TERM="xterm"

# Expose MongoDB port
EXPOSE 27017

# Switch to the mongodb user
USER mongodb

# Start MongoDB and keep the container running
CMD ["mongod", "--bind_ip_all", "--dbpath", "/data/db", "--logpath", "/var/log/mongodb/mongod.log", "--logappend"]

USER root