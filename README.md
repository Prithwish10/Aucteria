<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

# <h1 align="center">Aucteria</h1>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#project-architecture">Project Architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
<!--     <li><a href="#usage">Usage</a></li> -->
<!--     <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
<!--     <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
<!--     <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Aucteria is a cloud-based serverless full featured bidding solution, which helps auction businesses manage the entire lifecycle of auctions using bidding as the bargaining alternative.
It let users watch live sell-offs online and bid on auction markets in real-time.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* **Serverless**
* **Auth0**
* ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
* ![AmazonDynamoDB](https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)
* ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
* ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT WORKING -->
### How the services work together

The application is based on the **event-driven microservice architecture**, that uses events to trigger and communicate between decoupled microservices.
It has 3 microservices:
* **Auth Service**:
  * This service helps us to handle authentication and authorization using **Auth0**.
  * It will have an authorizer lambda function which will authorize the users using **Jason Web Token (JWT).
  * We will also introduce the authorizet in our **API Gateway**, which means every request will be authorised using JWT. This will ensure that our APIs     are protected, and we also get to know the identity of the caller.
* **Auction Service**: 
  * It will have 6 lambda functions, out of which 5 of them are used for CRUD operations, i.e., creating an auction, getting a single auction, placing a     bid on an auction, and uploading an auction picture.
  * For these 5 lambda functions request will come from the **API Gateway**.
  * When a user creates an auction, we'll process the auction by doing some validations, and we'll write the auction to the **DynamoDB** table.
  * The 6th lambda function that we have in this service is called the processAuction.
  * This 6th function will get triggered by the **AWS EventBridge** periodically. And what the function will do is to close an auction after 1 hour being     open. After closing the auction, we need to send email to the highest bidder and seller and the outcome.
  * This brings us to the Notification Service.
* **Notification Service**:
  * It will have an **AWS SQS**.
  * processAuction lambda function in the Auction Service will send messages/emails to this queue.
  * The messages will then be picked up by a **sendEmail** lambda function, and an email will be send with the **AWS SES** service.
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- PROJECT ARCHITECTURE -->

### Project Architecture
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
    * Now log out from your AWS developer console and sign-in with the new username and password that you just created
    
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

Name - Prithwish Das

Project Link: https://github.com/Prithwish10/Aucteria

LinkedIn: https://www.linkedin.com/in/prithwishdas60/

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
