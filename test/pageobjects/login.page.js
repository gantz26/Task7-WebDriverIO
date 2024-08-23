import Page from "./page.js";

class LoginPage extends Page {
    get usernameInput () {
        return $("#user-name");
    }

    get passwordInput () {
        return $("#password");
    }

    get loginButton () {
        return $("#login-button");
    }

    get errorMessage() {
        return $(".error-message-container.error");
    }

    get title() {
        return $(".login_logo");
    }

    async login (username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }

    async open () {
        await super.open("/");
    }
}

export default new LoginPage();
