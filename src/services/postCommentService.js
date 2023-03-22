export const postComment = (videoID, comment, callback) => {
    var myHeaders = new Headers();
    myHeaders.append(
        'Authorization',
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3ODM3Mjk1OSwiZXhwIjoxNjgwOTY0OTU5LCJuYmYiOjE2NzgzNzI5NTksImp0aSI6IkZZVU9WbVZqbDBMdW5oTnIiLCJzdWIiOjUyMDMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.iGRQH_zF5tXyClugWNIfUfTySW-pz3PWUC69MT6YSBk',
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
        comment: comment,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch(`https://tiktok.fullstack.edu.vn/api/videos/${videoID}/comments`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            callback();
        })
        .catch((error) => console.log('error', error));
};
