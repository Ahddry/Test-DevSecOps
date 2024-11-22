var http = require("http");
const crypto = require("crypto");

// Hardcoded private key
const privateKey =
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgeggSazzadzadazdadQDJUcz8Lr8DSdpD\n/+azeHwKF6KcAzzceJMICHELJEANFLNKIJPM5DooXh4p9NG+zxB2o4/WyJWUoC1\n8Z2yzK5SrD73CkLp8iML7w0hXx8rNRFREDOALFREDOYDV9SR97QhajglNuMIdoyGrI1\nNcu08BfKFt/H1UqbipedJBD3rvVYmrJGIttgPTFKg8uVwuweOYIc61B7lNMYkEew\nyJJ7jEFanjH8aeZrCzpft34RhcosAOpF3dh0COAHJMu26DlL3baliXGKmGqwmsVy\nO5Cp7mbDgcHjXbkct2KAnIMIspbfcIWgDk7ldqlLRJokHpciFryCqtOsnK3FRuEn\nyxlbNsdJAgMBAAECggEAHrXDAIQsALcrG7zkbrCaFVsKI+Tti487pBl4bjIOkXQK\naH/hsu3BkO8SxssJFHaeOEh78we2qvbeagLPxNbqz7M1Tq+Kyg+1D2y5ssnFIizx\nHdvKSlok8DT4Ab/zahk9i/bBL/T5CTQf07SfXLxUULBhFiWAAk6ntqGqEfJnPErl\ndrhMFanJ6XGTGWiDVy54OMHdWE2/nKREaYCX7OePfnLhL+1HvVp8g4Y4i0ekLOm0\nmqQZuk6v40MSbAXLN29mFUd1g175pmH3N1ympwZmguq71HiJ+rB7qBEIJOoSQUFa\nldeTjzuPef9EIjgOVkEA63nezDQhv9Jy/d+jEO92BQKBgQDyVOAD6aUANSrepsn/\nFZuH7F/UX6Wj92aAlgoTOD8r6FPwlzocrftrucputenulyu/70+nYlf\n4QO1bstbK7+2wFwWj4Qg2mBGT2IRWjezAHT0ZOv0QWscoOL/MwVU3iHz68qRB6aa\nibXjB/1WHewMp88PXQM2DcomxQKBgQDUrLyDGhRaGZRLWn5TaXsIVo5qCFr3X35r\noremKpwhAFrR2Xtc6wMdZ0CUBmcLkURY+98HiX5RfLYdgfGzFY0zzWnM/C0sb5/G\nr3RkCI4bTGhKwv+Jqsho/EjCtf0q/rfU/wD9Y1cffLAovH0YCBl6bsuFQBqPfGAe\nWVGxmOnGtQKBgEEfZgQnKdxgbWDgWbBfUii48RfVjGH//l/X8mUv3GokSUqCmW9T\noVuWZvQb/cC0xD783i3BWLk+qNDG7UAC7Eg5uhSKMT8fep/leZCKnwzGEIixQf6s\nxMFYzcAaRHqxEc+bGnewKleuqgVHlRI6p9KXNxGJgQH1psNuL4q7MfQxAoGBAK6g\nNxme7F8e6bkF0PxEfBVYnQ9LVQYRjwhqT0lNa21dkTUF0ll1TtVx1oC00R+aY/h8\nt6DEsMfQEukfrYpSg+KpI9qApcb60MKfhn4s2CJqFqhsfM5ZQL2TiVr3e602AVQP\nHozwaLUd+Lc6Lazx2ZnCJ7J99FEk2veQd5fP6wSRAoGBAIxm7MRD4FyNEJbcq5B9\nEtZJsZghUlWuWd82evjDutwCN9VPcv1+B+KyHtPcUwviGIV3VlwhnUIgp43dPKmA\nJpmEV+FfWG6XbzpqIRAa8DXkbwu6BLxxFYwNVuH6lgNpThOw8FvyXWL3l8QkKn0w\nbe9J3ySt1p+N2tatz8DcaVIX\n-----END PRIVATE KEY-----\n";

function getEncryptedData() {
    // Encrypt data using public key
    const data = "Sensitive data";
    const buffer = Buffer.from(data, "utf8");
    const encrypted = crypto.publicEncrypt(privateKey, buffer);
    return encrypted.toString("base64");
}

function decryptData(encryptedData) {
    const buffer = Buffer.from(encryptedData, "base64");
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
}

// Example usage
const encryptedData = getEncryptedData();
const decryptedData = decryptData(encryptedData);
console.log("Decrypted data:", decryptedData);

http.createServer((req, res) => {
    res.writeHead(200, {
        "Set-Cookie":
            "sessionId=abc123; access_token=eyJraWQiOiJkZWZhdWx0LWdyYXZpdGVlLUFNLWtleSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiIyMjdjMjgzNS05ODlmLTQ0ODYtYmMyOC0zNTk4OWY5NDg2ZjQiLCJhdWQiOiI3YTczNDZmZC1jNDRmLTQ1YmMtYjM0Ni1mZGM0NGYxNWJjZTUiLCJkb21haW4iOiI3MmVjZjVmMy05ZTRjLTQ5OTctYWNmNS1mMzllNGNhOTk3N2QiLCJzY29wZSI6Im9wZW5pZCIsImlzcyI6Imh0dHBzOi8vYW0uZGV2Lm12cC1zZWNyZXQuZnIvYXV0aC91c2Vycy9vaWRjIiwiZXhwIjoxNzg2Nzc3NjQ3LCJpYXQiOjE2NTUyNDE2NDcsImp0aSI6IkNWN2RoYzRlWHBQOE1sempZZFpuMDU5dUVacjJvTG9BN1dFUC1leENUbzAifQ.3k8XlXXh6looDF_ZV5sL7GPdN1wx2sCNOnZvlvLIzoA",
        "Content-Type": "text/plain",
    });
    res.end("Cookie has been set");
}).listen(3000, () => {
    console.log("Server is listening on port 3000");
});
