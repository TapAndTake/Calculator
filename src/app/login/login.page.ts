import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth.service/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  data: any;

  constructor(
    private menu: MenuController, 
    private http: HTTP, 
    private router: Router, 
    public alertController: AlertController, 
    private authservice: AuthServiceService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  async AlertErr(message: any) {
    const alert = await this.alertController.create({
      header: 'Ошибка',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async login(){
    const {username, password} = this;
    this.data = {name: username, pass: password};

    this.http.post('http://wayforpaytest.had.su/test/login.php', this.data, {}).then(data => {
      if(data.data != '0'){
        this.authservice.setUser(data.data);
        this.authservice.setUserId();
        this.router.navigate(['home']);
      } else{
        this.AlertErr('Пользователь не зарегестрирван');
      }
    });
    const loading = await this.loadingController.create({
      message: 'Вход...',
      duration: 2000
    });
    await loading.present();

    await loading.onDidDismiss();
    this.router.navigate(['home']);
  }

  goRegister(){
    this.router.navigate(['register']);
  }


}
