const statusCodes = [
  {
    name: "Information",
    intro:
      "An informational response indicates the server is thinking through the request. It lets the client know they should wait for a final response. This response only contains the status and optional header fields.",
    codes: [
      {
        status: "100",
        explain: "Continue",
        meaning:
          "The server has received the request headers and the client should proceed to send the request body or ignore the response if the request is already finished.",
      },
      {
        status: "101",
        explain: "Switching protocols",
        meaning:
          "The client has asked the server to switch protocols and the server has agreed to do so.",
      },
      {
        status: "102",
        explain: "Processing (WebDAV)",
        meaning:
          "A WebDAV request may contain many sub-requests, which may require a long time to complete the request. This indicates the server has received the request and is processing it, but no response is available yet.",
      },
      {
        status: "103",
        explain: "Early hints",
        meaning:
          "Is used to allow the user agent to preload resources, while the server prepares a response.",
      },
    ],
  },
  {
    name: "Successful",
    intro:
      "The request was successfully received, and accepted by the server gave the client the expected response.",
    codes: [
      {
        status: "200",
        explain: "OK",
        meaning:
          "The request succeeded. The meaning of this 'success' depends on the HTTP method.",
      },
      {
        status: "201",
        explain: "Created",
        meaning:
          "The request succeeded and resulted in one or more new resources are being created.",
      },
      {
        status: "202",
        explain: "Accepted",
        meaning:
          "The request has been accepted for processing, but the processing has not been finished yet. It is intended for cases where another process or server handles the request, or for batch processing.",
      },
      {
        status: "203",
        explain: "Non authoritative information",
        meaning:
          "The request was successful. but the metadata that has been received not exactly the same as is from the origin server and has instead been collected from a third-party copy. When not used for backups or mirrors of another resource a 200 OK response is the preferred choice.",
      },
      {
        status: "204",
        explain: "No content",
        meaning: "The request succeeded but there is no content to return.",
      },
      {
        status: "205",
        explain: "Reset content",
        meaning:
          "This status code tells the user agent to reset the document which sent this request.",
      },
      {
        status: "206",
        explain: "Partial content",
        meaning:
          "This status code is used when the client provided the range header to request only part of a resource.",
      },
      {
        status: "207",
        explain: "Multi-status (WebDAV)",
        meaning:
          "Conveys information about multiple resources, when there might be multiple status codes appropriate.",
      },
      {
        status: "208",
        explain: "Already reported (WebDAV)",
        meaning:
          "Used inside a DAV:propstat response element to avoid repeated enumerating over internal members of multiple bindings of the same collection.",
      },
      {
        status: "226",
        explain: "Im used (HTTP Delta encoding)",
        meaning:
          "The server has successfully fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
      },
    ],
  },
  {
    name: "Redirection",
    intro:
      "This indicates you got redirected to somewhere else or need to take additional action to complete this request. This additional action may or may not happen automatically by the client.",
    codes: [
      {
        status: "300",
        explain: "Multiple choices",
        meaning:
          "The request has multiple response. The user/user agent should choose one of them. (Response with multiple HTML links to the different possibilities are recommended)",
      },
      {
        status: "301",
        explain: "Moved permanently",
        meaning:
          "The URL of the requested resource has been changed permanently. The new URL is given in the response. It is advised to use this status code for seo when change to a new url.",
      },
      {
        status: "302",
        explain: "Found",
        meaning:
          "This status code means that the URI of the resource has been changed temporarily. Only use this when you make temporary changes and the client should use this URI in the future.",
      },
      {
        status: "303",
        explain: "See other",
        meaning:
          "The server respond with this status code to direct the client to get the requested resource at another URI with a GET request.",
      },
      {
        status: "304",
        explain: "Not modified",
        meaning:
          "This is used for caching purposes. It informs the client that the response has not been modified and can continue to use their cached version.",
      },
      {
        status: "305",
        explain: "Use proxy deprecated",
        meaning:
          "This is used to inform the client they can only access this URI by a proxy. This is deprecated due to security concerns.",
      },
      {
        status: "306",
        explain: "Switch Proxy",
        meaning: "This response code is no longer used.",
      },
      {
        status: "307",
        explain: "Temporary redirect",
        meaning:
          "The server sends this response to direct the client to get the requested resource at another URI with same method. The request method, however, must not be changed.",
      },
      {
        status: "308",
        explain: "Permanent redirect",
        meaning:
          "The resource is now permanently located at another URI and future references to the resource should be made by using one of the returned URIs.",
      },
    ],
  },
  {
    name: "Client error",
    intro:
      "These status codes are used for errors that may have been caused by the client for example an api or page is request that doesn't exist. These should return a meaningful message to the client.",
    codes: [
      {
        status: "400",
        explain: "Bad request",
        meaning:
          "The server cannot or will not process the request because of invalid syntax.",
      },
      {
        status: "401",
        explain: "Unauthorized",
        meaning:
          "The request requires user authentication and no credentials where provided.",
      },
      {
        status: "402",
        explain: "Payment required (experimental)",
        meaning:
          "This response code is reserved for future use in digital payment systems, but is very rarely used and no standard exists.",
      },
      {
        status: "403",
        explain: "Forbidden",
        meaning:
          "The client is not authorized to request the content. The difference between 401 Unauthorized, is that the server knows the clients identity.",
      },
      {
        status: "404",
        explain: "Not found",
        meaning:
          "The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint does not exist. This can also be send instead of 403 to prevent a client from knowing the existence of the endpoint.",
      },
      {
        status: "405",
        explain: "Method not allowed",
        meaning:
          "The request method is known by the server but this method is disabled. For example on a API the DELETE method might not be allowed on a resource.",
      },
      {
        status: "406",
        explain: "Not acceptable",
        meaning:
          "This response is sent when the web server, cannot find any content following the criteria given by the user agent.",
      },
      {
        status: "407",
        explain: "Proxy authentication required",
        meaning:
          "This status code is similar to 401 Unauthorized but authentication should be done by a proxy.",
      },
      {
        status: "408",
        explain: "Request timeout",
        meaning:
          "This response is returned on an idle connection by some servers. It means the server did not receive a response in time and wants to close the connection.",
      },
      {
        status: "409",
        explain: "Conflict",
        meaning:
          "This response is sent when a request conflicts with the current state of a resource on the server.",
      },
      {
        status: "410",
        explain: "Gone",
        meaning:
          "This response is returned when the client requests content that has been permanently deleted. This can be used seo-wise instead of 404 if you want to completely remove a page from Googles search index.",
      },
      {
        status: "411",
        explain: "Length required",
        meaning:
          "Server rejected the request because the Content-length header field is not provided and the server requires it.",
      },
      {
        status: "412",
        explain: "Precondition failed",
        meaning:
          "The server does not meet one or multiple preconditions that were indicated in the request headers.",
      },
      {
        status: "413",
        explain: "Payload too large",
        meaning:
          "The server denies to process the request because the requested payload is larger than the server allows.",
      },
      {
        status: "414",
        explain: "Uri too long",
        meaning:
          "The client requested a URI that is longer than the server is willing to interpret.",
      },
      {
        status: "415",
        explain: "Unsupported media type",
        meaning:
          "The server denies this requested because it does not support the media format of the requested data.",
      },
      {
        status: "416",
        explain: "Range not satisfiable",
        meaning:
          "The range specified by the Range header field cannot be fulfilled. The reason might be that the range is outside the size of the targets data.",
      },
      {
        status: "417",
        explain: "Expectation failed",
        meaning:
          "This status code means that the expectation indicated by the Expect request-header field could not be met by the server.",
      },
      {
        status: "418",
        explain: "I'm a teapot",
        meaning:
          "The server refuses the attempt to brew coffee with a teapot. (It is a reference to a 1998 April Fools joke called 'Hyper Text Coffee Pot Control Protocol').",
      },
      {
        status: "421",
        explain: "Misdirected request",
        meaning:
          "The request was received by a server that is not configured to respond to this request.",
      },
      {
        status: "422",
        explain: "Unprocessable entity",
        meaning:
          "The request was well-formed but the server could not respond because of semantic errors.",
      },
      {
        status: "423",
        explain: "Locked (WebDAV)",
        meaning: "The resource that is being requested is locked.",
      },
      {
        status: "424",
        explain: "Failed dependency (WebDAV)",
        meaning:
          "The request failed because of a failure in a previous request.",
      },
      {
        status: "425",
        explain: "Too early (experimental)",
        meaning:
          "The server is not willing to processing this request because it might be replayed.",
      },
      {
        status: "426",
        explain: "Upgrade required",
        meaning:
          "The server denies to execute the request with the current protocol but might be willing to do so after the client upgrades to a different protocol.",
      },
      {
        status: "428",
        explain: "Precondition required",
        meaning:
          "The server requires the request to be conditional. This response is intended to prevent the lost data, when a client requests a resource, modifies it and updates it in the server, while a third party has also modified the resource on the server, which might cause a conflict.",
      },
      {
        status: "429",
        explain: "Too many requests",
        meaning:
          "The client has sent too many requests in a given amount of time mostly used with rate limiters.",
      },
      {
        status: "431",
        explain: "Request",
        meaning:
          "The server is denies to process the request because the header fields are too large.",
      },
      {
        status: "444",
        explain: "Instruct nginx to close the connection",
        meaning:
          "A non-standard status code that mostly only appears in nginx log files. It is used to instruct nginx to close the connection without sending a response to the client.",
      },
      {
        status: "451",
        explain: "Unavailable for legal reasons",
        meaning:
          "The client requested a illegal resource (for example sites that are blocked by the government.",
      },
    ],
  },
  {
    name: "Server error",
    intro:
      "This status code category is returned when a valid request was made by the client but the server failed to complete the request ",
    codes: [
      {
        status: "500",
        explain: "Internal server error",
        meaning:
          "The server has encountered a unexpected event that it does not know how to handle.",
      },
      {
        status: "501",
        explain: "Not implemented",
        meaning:
          "The request is not supported by the server and cannot be handled.",
      },
      {
        status: "502",
        explain: "Bad gateway",
        meaning:
          "The server received an invalid response while working as a gateway.",
      },
      {
        status: "503",
        explain: "Service unavailable",
        meaning:
          "The server is not ready yet to handle the request. This might This is a common occurrence when the server is down for maintenance or is overloaded. With this response you can return a user-friendly page explaining the problem.",
      },
      {
        status: "504",
        explain: "Gateway timeout",
        meaning:
          "This error response is given when the server cannot get a response in time when acting as a gateway.",
      },
      {
        status: "505",
        explain: "Not supported",
        meaning:
          "The HTTP version used in this request is not supported by the server.",
      },
      {
        status: "506",
        explain: "Variant also negotiates",
        meaning:
          "The server has the following internal configuration error: the chosen variant resource is configured to engage in transparent negotiation, therefore it cannot be a proper end point in the negotiation process.",
      },
      {
        status: "507",
        explain: "Insufficient storage (WebDAV)",
        meaning:
          "The method could not be performed because the server is unable to store the representation needed to successfully complete the request.",
      },
      {
        status: "508",
        explain: "Loop detected (WebDAV)",
        meaning:
          "The server has detected an infinite loop while processing the request.",
      },
      {
        status: "510",
        explain: "Not extended",
        meaning:
          "Further extensions to the request are required for the server to fulfil it.",
      },
      {
        status: "511",
        explain: "Network authentication required",
        meaning:
          "This status code indicates that the client needs to authenticate to gain network access.",
      },
    ],
  },
  {
    name: "Unofficial codes",
    intro: "The following codes are not specified by any standard.",
    codes: [
      {
        status: "419",
        explain: "Page Expired (Laravel Framework)",
        meaning:
          "Used by the Laravel Framework when a CSRF Token is missing or expired.",
      },
      {
        status: "420",
        explain: "Method Failure (Spring Framework)",
        meaning:
          "A deprecated response used by the Spring Framework when a method has failed.",
      },
      {
        status: "420",
        explain: "Enhance Your Calm (Twitter)",
        meaning:
          'Returned by version 1 of the Twitter Search and Trends API when the client is being rate limited; versions 1.1 and later use the 429 Too Many Requests response code instead. The phrase "Enhance your calm" comes from the 1993 movie Demolition Man, and its association with this number is likely a reference to cannabis.',
      },
      {
        status: "430",
        explain: "Request Header Fields Too Large  (Shopify)",
        meaning:
          "Used by Shopify, instead of the 429 Too Many Requests response code, when too many URLs are requested within a certain time frame.",
      },
      {
        status: "450",
        explain: "Blocked by Windows Parental Controls (Microsoft)",
        meaning:
          "The Microsoft extension code indicated when Windows Parental Controls are turned on and are blocking access to the requested webpage.",
      },
      {
        status: "498",
        explain: "Invalid Token (Esri)Invalid Token (Esri)",
        meaning:
          "Returned by ArcGIS for Server. Code 498 indicates an expired or otherwise invalid token.",
      },
      {
        status: "499",
        explain: "Token Required (Esri)",
        meaning:
          "Returned by ArcGIS for Server. Code 499 indicates that a token is required but was not submitted.",
      },
      {
        status: "509",
        explain: "Bandwidth Limit Exceeded (Apache Web Server/cPanel)",
        meaning:
          "The server has exceeded the bandwidth specified by the server administrator; this is often used by shared hosting providers to limit the bandwidth of customers.",
      },
      {
        status: "529",
        explain: "Site is overloaded",
        meaning:
          "Used by Qualys in the SSLLabs server testing API to signal that the site can't process the request.",
      },
      {
        status: "530",
        explain: "Site is frozen",
        meaning:
          "Used by the Pantheon web platform to indicate a site that has been frozen due to inactivity.",
      },
      {
        status: "598",
        explain: "(Informal convention) Network read timeout error",
        meaning:
          "Used by some HTTP proxies to signal a network read timeout behind the proxy to a client in front of the proxy.",
      },
      {
        status: "599",
        explain: "Network Connect Timeout Error",
        meaning:
          "An error used by some HTTP proxies to signal a network connect timeout behind the proxy to a client in front of the proxy.",
      },
    ],
  },
  {
    name: "Internet Information Services",
    intro:
      "Microsoft's Internet Information Services (IIS) web server expands the 4xx error space to signal errors with the client's request.",
    codes: [
      {
        status: "440",
        explain: "Login Time-out",
        meaning: "The client's session has expired and must log in again.",
      },
      {
        status: "449",
        explain: "Retry With",
        meaning:
          "The server cannot honour the request because the user has not provided the required information.",
      },
      {
        status: "451",
        explain: "Redirect",
        meaning:
          "Used in Exchange ActiveSync when either a more efficient server is available or the server cannot access the users' mailbox.The client is expected to re-run the HTTP AutoDiscover operation to find a more appropriate server.",
      },
    ],
  },
  {
    name: "nginx",
    intro:
      "The nginx web server software expands the 4xx error space to signal issues with the client's request.",
    codes: [
      {
        status: "444",
        explain: "No Response",
        meaning:
          "Used internally to instruct the server to return no information to the client and close the connection immediately.",
      },
      {
        status: "494",
        explain: "Request header too large",
        meaning: "Client sent too large request or too long header line.",
      },
      {
        status: "495",
        explain: "SSL Certificate Error",
        meaning:
          "An expansion of the 400 Bad Request response code, used when the client has provided an invalid client certificate.",
      },
      {
        status: "496",
        explain: "SSL Certificate Required",
        meaning:
          "An expansion of the 400 Bad Request response code, used when a client certificate is required but not provided.",
      },
      {
        status: "497",
        explain: "HTTP Request Sent to HTTPS Port",
        meaning:
          "An expansion of the 400 Bad Request response code, used when the client has made a HTTP request to a port listening for HTTPS requests.",
      },
      {
        status: "499",
        explain: "Client Closed Request",
        meaning:
          "Used when the client has closed the request before the server could send a response.",
      },
    ],
  },
  {
    name: "Cloudflare",
    intro:
      "Cloudflare's reverse proxy service expands the 5xx series of errors space to signal issues with the origin server.",
    codes: [
      {
        status: "520",
        explain: "Web Server Returned an Unknown Error",
        meaning:
          "The origin server returned an empty, unknown, or unexpected response to Cloudflare.",
      },
      {
        status: "521",
        explain: "Web Server Is Down",
        meaning:
          "The origin server refused connections from Cloudflare. Security solutions at the origin may be blocking legitimate connections from certain Cloudflare IP addresses.",
      },
      {
        status: "522",
        explain: "Connection Timed Out",
        meaning: "Cloudflare timed out contacting the origin server.",
      },
      {
        status: "523",
        explain: "Origin Is Unreachable",
        meaning:
          "Cloudflare could not reach the origin server; for example, if the DNS records for the origin server are incorrect or missing.",
      },
      {
        status: "524",
        explain: "A Timeout Occurred",
        meaning:
          "Cloudflare was able to complete a TCP connection to the origin server, but did not receive a timely HTTP response.",
      },
      {
        status: "525",
        explain: "SSL Handshake Failed",
        meaning:
          "Cloudflare could not negotiate a SSL/TLS handshake with the origin server.",
      },
      {
        status: "526",
        explain: "Invalid SSL Certificate",
        meaning:
          "Cloudflare could not validate the SSL certificate on the origin web server. Also used by Cloud Foundry's gorouter.",
      },
      {
        status: "527",
        explain: "Railgun Error",
        meaning:
          "Error 527 indicates an interrupted connection between Cloudflare and the origin server's Railgun server.",
      },
      {
        status: "530",
        explain: "",
        meaning: "Error 530 is returned along with a 1xxx error.",
      },
    ],
  },
  {
    name: "AWS Elastic Load Balancer",
    intro: "Amazon's Elastic Load Balancing adds a few custom return codes",
    codes: [
      {
        status: "460",
        explain: "",
        meaning:
          "Client closed the connection with the load balancer before the idle timeout period elapsed. Typically when client timeout is sooner than the Elastic Load Balancer's timeout.",
      },
      {
        status: "463",
        explain: "",
        meaning:
          "The load balancer received an X-Forwarded-For request header with more than 30 IP addresses.",
      },
      {
        status: "561",
        explain: "Unauthorized",
        meaning:
          "An error around authentication returned by a server registered with a load balancer. You configured a listener rule to authenticate users, but the identity provider (IdP) returned an error code when authenticating the user.",
      },
    ],
  },
  {
    name: "Caching warning codes (obsoleted)",
    intro:
      'The following caching related warning codes were specified under RFC 7234. Unlike the other status codes above, these were not sent as the response status in the HTTP protocol, but as part of the "Warning" HTTP header.\nSince this "Warning" header is often neither sent by servers nor acknowledged by clients, this header and its codes were obsoleted by the HTTP Working Group in 2022 with RFC 9111.',
    codes: [
      {
        status: "110",
        explain: "Response is Stale",
        meaning:
          "The response provided by a cache is stale (the content's age exceeds a maximum age set by a Cache-Control header or heuristically chosen lifetime).",
      },
      {
        status: "111",
        explain: "Revalidation Failed",
        meaning:
          "The cache was unable to validate the response, due to an inability to reach the origin server.",
      },
      {
        status: "112",
        explain: "Disconnected Operation",
        meaning:
          "The cache is intentionally disconnected from the rest of the network.",
      },
      {
        status: "113",
        explain: "Heuristic Expiration",
        meaning:
          "The cache heuristically chose a freshness lifetime greater than 24 hours and the response's age is greater than 24 hours.",
      },
      {
        status: "199",
        explain: "Miscellaneous Warning",
        meaning:
          "Arbitrary, non-specific warning. The warning text may be logged or presented to the user.",
      },
      {
        status: "214",
        explain: "Transformation Applied",
        meaning:
          "Added by a proxy if it applies any transformation to the representation, such as changing the content encoding, media type or the like.",
      },
      {
        status: "299",
        explain: "Miscellaneous Persistent Warning",
        meaning: "Same as 199, but indicating a persistent warning.",
      },
    ],
  },
];
const selectOpt = [
  { label: "100 Continue", value: "100" },
  { label: "101 Switching protocols", value: "101" },
  { label: "102 Processing (WebDAV)", value: "102" },
  { label: "103 Early hints", value: "103" },
  { label: "200 OK", value: "200" },
  { label: "201 Created", value: "201" },
  { label: "202 Accepted", value: "202" },
  { label: "203 Non authoritative information", value: "203" },
  { label: "204 No content", value: "204" },
  { label: "205 Reset content", value: "205" },
  { label: "206 Partial content", value: "206" },
  { label: "207 Multi-label (WebDAV)", value: "207" },
  { label: "208 Already reported (WebDAV)", value: "208" },
  { label: "226 Im used (HTTP Delta encoding)", value: "226" },
  { label: "300 Multiple choices", value: "300" },
  { label: "301 Moved permanently", value: "301" },
  { label: "302 Found", value: "302" },
  { label: "303 See other", value: "303" },
  { label: "304 Not modified", value: "304" },
  { label: "305 Use proxy deprecated", value: "305" },
  { label: "306 Switch Proxy", value: "306" },
  { label: "307 Temporary redirect", value: "307" },
  { label: "308 Permanent redirect", value: "308" },
  { label: "400 Bad request", value: "400" },
  { label: "401 Unauthorized", value: "401" },
  { label: "402 Payment required (experimental)", value: "402" },
  { label: "403 Forbidden", value: "403" },
  { label: "404 Not found", value: "404" },
  { label: "405 Method not allowed", value: "405" },
  { label: "406 Not acceptable", value: "406" },
  { label: "407 Proxy authentication required", value: "407" },
  { label: "408 Request timeout", value: "408" },
  { label: "409 Conflict", value: "409" },
  { label: "410 Gone", value: "410" },
  { label: "411 Length required", value: "411" },
  { label: "412 Precondition failed", value: "412" },
  { label: "413 Payload too large", value: "413" },
  { label: "414 Uri too long", value: "414" },
  { label: "415 Unsupported media type", value: "415" },
  { label: "416 Range not satisfiable", value: "416" },
  { label: "417 Expectation failed", value: "417" },
  { label: "418 I'm a teapot", value: "418" },
  { label: "421 Misdirected request", value: "421" },
  { label: "422 Unprocessable entity", value: "422" },
  { label: "423 Locked (WebDAV)", value: "423" },
  { label: "424 Failed dependency (WebDAV)", value: "424" },
  { label: "425 Too early (experimental)", value: "425" },
  { label: "426 Upgrade required", value: "426" },
  { label: "428 Precondition required", value: "428" },
  { label: "429 Too many requests", value: "429" },
  { label: "431Request ", value: "431" },
  { label: "444 Instruct nginx to close the connection", value: "444" },
  { label: "451 Unavailable for legal reasons", value: "451" },
  { label: "500 Internal server error", value: "500" },
  { label: "501 Not implemented", value: "501" },
  { label: "502 Bad gateway", value: "502" },
  { label: "503 Service unavailable", value: "503" },
  { label: "504 Gateway timeout", value: "504" },
  { label: "505 Not supported", value: "505" },
  { label: "506 Variant also negotiates", value: "506" },
  { label: "507 Insufficient storage (WebDAV)", value: "507" },
  { label: "508 Loop detected (WebDAV)", value: "508" },
  { label: "510 Not extended", value: "510" },
  { label: "511 Network authentication required", value: "511" },
  { label: "419 Page Expired (Laravel Framework)", value: "419" },
  { label: "420 Method Failure (Spring Framework)", value: "420" },
  { label: "420 Enhance Your Calm (Twitter)", value: "420" },
  { label: "430 Request Header Fields Too Large  (Shopify)", value: "430" },
  {
    label: "450 Blocked by Windows Parental Controls (Microsoft)",
    value: "450",
  },
  { label: "498 Invalid Token (Esri)Invalid Token (Esri)", value: "498" },
  { label: "499 Token Required (Esri)", value: "499" },
  {
    label: "509 Bandwidth Limit Exceeded (Apache Web Server/cPanel)",
    value: "509",
  },
  { label: "529 Site is overloaded", value: "529" },
  { label: "530 Site is frozen", value: "530" },
  {
    label: "598 (Informal convention) Network read timeout error",
    value: "598",
  },
  { label: "599 Network Connect Timeout Error", value: "599" },
  { label: "440 Login Time-out", value: "440" },
  { label: "449 Retry With", value: "449" },
  { label: "451 Redirect", value: "451" },
  { label: "444 No Response", value: "444" },
  { label: "494 Request header too large", value: "494" },
  { label: "495 SSL Certificate Error", value: "495" },
  { label: "496 SSL Certificate Required", value: "496" },
  { label: "497 HTTP Request Sent to HTTPS Port", value: "497" },
  { label: "499 Client Closed Request", value: "499" },
  { label: "520 Web Server Returned an Unknown Error", value: "520" },
  { label: "521 Web Server Is Down", value: "521" },
  { label: "522 Connection Timed Out", value: "522" },
  { label: "523 Origin Is Unreachable", value: "523" },
  { label: "524 A Timeout Occurred", value: "524" },
  { label: "525 SSL Handshake Failed", value: "525" },
  { label: "526 Invalid SSL Certificate", value: "526" },
  { label: "527 Railgun Error", value: "527" },
  { label: "530", value: "530" },
  { label: "460", value: "460" },
  { label: "463", value: "463" },
  { label: "561 Unauthorized", value: "561" },
  { label: "110 Response is Stale", value: "110" },
  { label: "111 Revalidation Failed", value: "111" },
  { label: "112 Disconnected Operation", value: "112" },
  { label: "113 Heuristic Expiration", value: "113" },
  { label: "199 Miscellaneous Warning", value: "119" },
  { label: "214 Transformation Applied", value: "214" },
  { label: "299 Miscellaneous Persistent Warning", value: "299" },
];
const uglyData: string[] = [];
for (const objList of statusCodes) {
  for (const obj of objList.codes) {
    uglyData.push(obj.status);
  }
}
const isHttpCode = (text: string): boolean => {
  if (
    text.startsWith("1") ||
    text.startsWith("2") ||
    text.startsWith("3") ||
    text.startsWith("4") ||
    text.startsWith("5")
  ) {
    return false;
  }

  return uglyData.includes(text);
};
export { statusCodes, selectOpt, isHttpCode };
