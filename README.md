# MySQL DB Editor 🌐

**MySQL DB Editor** is a versatile web-based application that allows users to connect to MySQL databases from anywhere and also supports local setup on your system. It offers easy access to MySQL, making database management more convenient and accessible. 💻🔧

## Features 🚀

- **Remote MySQL Access:** Connect to your MySQL databases from anywhere with ease.
- **Local Setup:** Set up the application on your own system for personal use.
- **User-Friendly Interface:** Enjoy an intuitive and easy-to-use interface for managing your databases.

## Setup Instructions 🛠️

### Running Locally

#### Windows

1. Clone the repository:
    ```bash
    git clone https://github.com/adarshM84/mysqldbmanager.git
    ```
2. Move the cloned folder to `htdocs`:
    - Place the `mysqldbeditor` folder inside the `htdocs` directory of your XAMPP installation.

#### Linux

1. Clone the repository:
    ```bash
    git clone https://github.com/adarshM84/mysqldbmanager.git
    ```
2. Make the following changes to your `nginx` configuration file:

    ```nginx
    server_name localhost;
    root /var/www/html;

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;  # Adjust the PHP version if necessary
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location /dbmslite {
        try_files $uri $uri/ /index.php;
    }
    ```

3. Install PHP and set up `php-fpm` if not already done.

## Getting Started 🚀

1. **Clone the repository:**
    ```bash
    git clone https://github.com/adarshM84/mysqldbmanager.git
    ```
2. **Configure the application** to connect to your MySQL database by editing the configuration files.
3. **Run the application** through your local server or access it via the provided URL for remote use.

## Contributing 🤝

Feel free to contribute to this project by submitting issues, feature requests, or pull requests. Your feedback and contributions are welcome!

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

If you have any questions or need further assistance, please feel free to [contact me](mailto:adarshmishra812003@gmail.com). Happy coding! 😊
