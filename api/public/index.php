<?php

function setHeaders(): void
{
    header('Access-Control-Allow-Origin: http://paw.test');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: content-type');
    header('Content-type: application/json');
}

function sessionCookie(): void
{
    session_set_cookie_params([
            'lifetime' => 0,
            'path' => '/',
            'domain' => '.paw.test',
            'secure' => false,
            'httponly' => true,
            'samesite' => 'none',
        ]
    );
    session_start();
}

function randomString(): string
{
    $characters = 'abcdefghijklmnopqrstuvwxyz';
    $randomString = '';

    for ($i = 0; $i < 5; $i++) {
        $index = rand(0, strlen($characters) - 1);
        $randomString .= $characters[$index];
    }

    return ucfirst($randomString);
}

function invalidUrl(): array
{
    http_response_code(404);

    return ['error' => 'Invalid URL'];
}

function invalidUser(): array
{
    http_response_code(401);

    return ['error' => 'Invalid login details'];
}

function validate($requestData): bool
{
    if ($requestData['email'] !== 'user@paw.test' || $requestData['password'] !== '123456') {
        return false;
    }

    return true;
}

function validUser(): void
{
    http_response_code(204);

    $userId = rand(1, 100);
    $_SESSION['userId'] = $userId;
    $_SESSION['userName'] = randomString();
}

function loginUser(array $requestData): ?array
{
    if (validate($requestData)) {
        validUser();

        return null;
    }

    return invalidUser();
}

function initialiseHighScores(): array
{
    $scores = [];
    for ($i = 0; $i < 10; $i++) {
        $scores[] = [
            'userName' => randomString(),
            'score' => rand(0, 10000)
        ];
    }

    // Sort the scores into descending order
    usort($scores, function ($score1, $score2) {
        return $score2['score'] <=> $score1['score'];
    }
    );

    return $scores;
}

function createHighScores(array $userValues): array
{
    $highScores = initialiseHighScores();

    // Insert the user into the high scores at the correct position
    for ($i = 0; $i < count($highScores); $i++) {
        if ($highScores[$i]['score'] < $userValues['score']) {
            array_splice($highScores, $i, 1, [$userValues]);
            return $highScores;
        }
    }

    return $highScores;
}

function userData(): array
{
    $userId = $_SESSION['userId'];
    $userName = $_SESSION['userName'];
    $score = rand(0, 10000);

    // Set high scores for this session
    $_SESSION['highScores'] = createHighScores([
        'userName' => $userName,
        'score' => $score
    ]);

    return [
        'userId' => $userId,
        'userName' => $userName,
        'score' => $score
    ];
}

function handleFeedback($requestData): ?array
{
    http_response_code(204);

    return null;
}

function handlePostOrPut(string $uri, array $requestData): ?array
{
    if ($uri === '/login') {
        return loginUser($requestData);
    }

    if ($uri === '/feedback') {
        return handleFeedback($requestData);
    }

    return invalidUrl();
}

function handleGet(string $uri): ?array
{
    if (!isset($_SESSION['userId'])) {
        return invalidUser();
    }

    if ($uri === '/user-data') {
        return userData();
    }

    if ($uri === '/high-scores') {
        return $_SESSION['highScores'];
    }

    return invalidUrl();
}

function handleRequest(string $method, string $uri): ?array
{
    // Treat POST and PUT as the same for the purposes of this exercise
    if ($method === 'POST' || $method === 'PUT') {
        return handlePostOrPut($uri, json_decode(file_get_contents('php://input'), true));
    }
    if ($method === 'GET') {
        return handleGet($uri);
    }

    return null;
}

function main(string $method, string $uri): void
{
    setHeaders();
    sessionCookie();
    $responseData = handleRequest($method, $uri);
    if ($responseData) {
        echo json_encode($responseData);
    }
}

main($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
