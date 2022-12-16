const Mailer = require("../../libs/mailer");

class NotificarSolicitudAnalisis {
  constructor(numDoc) {
    this.numDoc = numDoc; 
  }

  async execute() {
    try {
      const mailer = new Mailer({
        host: process.env.NOTIFICATION_EMAIL_HOST,
        port: process.env.NOTIFICATION_EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.NOTIFICATION_EMAIL_USER,
          pass: process.env.NOTIFICATION_EMAIL_PASSWORD
        }
      }); 

      mailer.send(
        process.env.NOTIFICATION_EMAIL_USER,
        process.env.NOTIFICATION_EMAIL_USER,
        `Nueva solicitud ${this.numDoc}`,
        `${this.numDoc}`,
        `<div 
              style="
                display: flex;
                justify-content: center;
                margin-top: 30px;
              "
            >
              <div
                style="
                  display:flex;
                  align-items: center;
                  gap: 10px;
                  min-width: 400px;
                  max-width: 500px;
                  border: 1px solid gray;
                  border-radius: 4px;
                  padding: 20px 10px;
                  font-family: arial, verdana;
                  flex-direction: column;
                "
                >
                <span class="titulo"
                  style="
                    font-size: 32px;
                  "
                >
                  Nueva solicitud
                </span>
                <span class="mensaje"
                  style="
                    font-size: 16px;    
                  "
                >
                  Se ha registrado una nueva solicitud
                </span>
                <span class="doc"
                  style="
                    font-size: 32px;
                    font-weigth: 900;
                  "
                >
                  Doc: ${this.numDoc}
                </span>
                <a href="" class="btn"
                  style="
                    padding: 8px 16px;
                    border-radius: 4px;
                    text-decoration: none;
                    color: white;
                    background: #333030;
                  "  
                >Ver en gofin</a>
              </div>
            </div>
          `
      );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = NotificarSolicitudAnalisis;
