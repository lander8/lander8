# README

Lander8 is a business analytics platform that gives insightful information to consumers on the data we collect about their business. This file
contains information related to development and devOps for the project.


## Development

### System dependencies

* Postgres (must be installed)

### Developer Setup

* Run ```gem install rails``` to install rails locally

* Run ```gem install bundler``` to install bundler, which manages RubyGems for you

* Run ```bundle install``` to install all gems required for this project

* Run ```rake db:setup``` to set up your database and seed it with sample data

* The server can be started by running ```rails s```, and can be accessed from localhost:3000

### Configuration

In the root folder, there exists a ```.env.sample``` file with environment variables undefined. Copy the contents of this file into a new file,
```.env``` and assign all the necessary values. This is for development purposes and only gets read in the development environment.

### Developer Workflow

* Create a branch for the issue or task you will be working on

* Make appropriate changes, following the code style guide

* Run ```rubocop -D``` and ensure there are no warnings or errors. If there are, go back an fix the appropriate styling issues

* Follow the [Airbnb Style Guide](https://github.com/airbnb/ruby)

* Make a pull request

## Production

The production application is hosted on Amazon Web Services. We use elasticbeanstalk to manage deploys and instances, and connect to an RDS 
database.

All DNS settings are handled through domains.google.com

### Configuration

* Production environment variables are read from the ElasticBeanstalk instance "Software Configuration" section

### Deploying

* Make sure you have elastic beanstalk CLI installed, and an AWS IAM account set up with proper permissions

* Only committed changes will be deployed, so make sure to ```git commit``` anything you want deployed

* For first time set up, run ```eb init``` and select the appropriate options

* Deploy using ```eb deploy```

### Monitoring and Logs

* Sentry is set up for automatic code monitoring and reporting whenever a user hits an error
