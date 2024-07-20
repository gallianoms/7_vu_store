import { Observable } from 'rxjs';
import { GenericService } from './../../../../core/services/generic.service';
import { Component, OnInit, inject } from '@angular/core';
import { User } from '@/app/core/interfaces/user/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  private genericService = inject(GenericService);
  users$!: Observable<User[]>;

  ngOnInit(): void {
    this.users$ = this.genericService.getAll('users');
  }
}
