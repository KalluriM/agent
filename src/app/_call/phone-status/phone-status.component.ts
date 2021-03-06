import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../_shared/backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServerConnection } from 'jema';
import { ManagerEnvironment } from 'src/app/_code/manager-environment';

@Component({
  selector: 'app-phone-status',
  templateUrl: './phone-status.component.html',
  styleUrls: ['./phone-status.component.css'],
})
export class PhoneStatusComponent implements OnInit {
  bus: ServerConnection;
  phoneState: any;
  onHook: boolean;
  btnColor: string;

  constructor(private service: BackendService, private router: Router) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
    this.bus.phoneState.subscribe((state) => {
      this.phoneState = state;
      this.onHook = true;
      switch (this.phoneState.state) {
        case 'Unknown':
          this.btnColor = 'btn-secondary';
          break;
        case 'UNAVAILABLE':
          this.btnColor = 'btn-secondary';
          break;
        case 'INUSE':
          this.onHook = false;
          this.btnColor = 'btn-danger';
          break;
        case 'Not in use':
        case 'NOT_INUSE':
          this.btnColor = 'btn-success';
          break;
        default:
          this.btnColor = 'btn-success';
          break;
      }
    });
  }

  unassignPhone() {
    if (!this.onHook) {
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'This will change the phone you are currently using!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change',
    }).then((result) => {
      if (result.value) {
        this.bus.unassignPhone().subscribe(() => {
          this.router.navigateByUrl('/phone');
        });
      }
    });
  }
}
