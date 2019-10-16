export class Bearer {

    static writeTokenToLocalStorage(token: string): void {
        localStorage.setItem("token", token);
    }

    static getTokenFromStorage(): string {
        return localStorage.getItem("token");
    }

    static deleteTokenFromStorage(): void {
        localStorage.removeItem("token");
    }
}
