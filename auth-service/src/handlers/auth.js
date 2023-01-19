import jwt from 'jsonwebtoken';

// By default, API Gateway authorizations are cached (TTL) for 300 seconds.
// This policy will authorize all requests to the same API Gateway instance where the
// request is coming from, thus being efficient and optimising costs.

// The generatePolicy function generates a policy that allows the invocation of lambda function in the target API gateway
// This policy is generated only after the token is verified
const generatePolicy = (principalId, methodArn) => {
  const apiGatewayWildcard = methodArn.split('/', 2).join('/') + '/*';

  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: apiGatewayWildcard, // Any API that is in the target API gateway
        },
      ],
    },
  };
};
// If no authorization token is provided, we throw Unauthorized
// Else we'll verify the signature of this token against the PUBLIC KEY from Auth0
// Then we get the claims
// Then we generate the policy using the above generatePolicy() function
// We return the Policy document and in context we pass the claims of the JWT(for the target function)
// This means that if I call the createAuction function and I'm authorized successfully, then createAunction() function will have access to the claims of this jwt, such as username, password, email
// And in this way in our createAuction() or placeBid() function we'll have the identy of the user
export async function handler(event, context) {
  if (!event.authorizationToken) {
    throw 'Unauthorized';
  }

  const token = event.authorizationToken.replace('Bearer ', '');

  try {
    const claims = jwt.verify(token, process.env.AUTH0_PUBLIC_KEY);
    const policy = generatePolicy(claims.sub, event.methodArn);

    return {
      ...policy,
      context: claims
    };
  } catch (error) {
    console.log(error);
    throw 'Unauthorized';
  }
};
