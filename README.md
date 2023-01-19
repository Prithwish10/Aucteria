<a name="readme-top"></a>

# Aucteria

## Built With

* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* **Serverless**
* ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
* ![AmazonDynamoDB](https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)
* ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
* ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT ARCHITECTURE -->

## Project Architecture
![Auction_service](https://user-images.githubusercontent.com/59892611/139708274-79a31927-3533-4db4-8d40-ac9232046417.jpg)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

I'm working on Ubuntu 20.04

### Prerequisites

* nodejs
  
  To get this version, you can use the apt package manager. Refresh your local package index first by typing:
  ```sh
  sudo apt update
  ```
  Then install Node.js:
  ```sh
  sudo apt install nodejs
  ```
  Check that the install was successful by querying node for its version number:
  ```sh
  node -v
  ```
* **npm**
  
  If the package in the repositories suits your needs, this is all you need to do to get set up with Node.js. In most cases, you’ll also want to also install npm, the   Node.js package manager. You can do this by installing the npm package with apt:
   ```sh
  sudo apt install npm
  ```
* **Create an AWS Account, if you don't already have one**

* **AWS CLI**

  To update or install the AWS CLI on your machine, you can refer to this amazing AWS documentation:
  https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
  
  After install the AWS CLI on your machine, open the cmd and type aws. If you get something like this, then you are good to go:
  ```sh
  C:\Users\prith>aws                                                                                                                                                     usage: aws [options] <command> <subcommand> [<subcommand> ...] [parameters]                                             
  To see help text, you can run:
  aws help
  aws <command> help
  aws <command> <subcommand> help
  aws: error: the following arguments are required: command 
  ```
  
* **Serverless framework**

  Serverless framework comes with a pretty amaizing cmd. To install it, you can refer to this serverless framework documentation. I've used npm to install it, as it is   really easy.
  https://www.serverless.com/framework/docs/getting-started
  
* **Configure the AWS CLI**

  Currently AWS or serverless don't know who you are. So you need to do the following steps:
  * Head over to your AWS developer console, and serach for the service IAM. This service handles permissions and users in AWS
  * Head over to **Users** from the left panel
  * Now you need to create a new user. Because it is not recommented to user your root AWS account. 
    * Give your new user the Programmatic access and AWS Management Console access.
    * Create a password for this new user
    * Attach Policies: You can give the AdmistratorAccess to your user, but in production built its recommended to give users permission to that many services that           they require.
    * After creating the user, you will get an Access key ID and Secret access key. You will need those to configure the AWS CLI.
    * Head over to your cmd and type **aws configure**, and give the Access key ID and Secret access key, along with the aws region and serverless.yaml file format.
      ```sh
      C:\Users\prith>aws configure
      AWS Access Key ID [****************YSHX]: <ACCESS KEY ID>
      AWS Secret Access Key [****************DXmb]: <SECRET ACCESS KEY>
      Default region name [us-east-1]: <REGION>
      Default output format [yaml]: <FORMAT OF YOUR serverless.yml file. Give yaml>
      ```
    * Now log out from your AWS developer console and sing-in with the new username and password that you just created
    
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Your Name - Prithwish Das

Project Link: https://github.com/Prithwish10/Aucteria

LinkedIn: https://www.linkedin.com/in/prithwishdas60/

<p align="right">(<a href="#readme-top">back to top</a>)</p>
