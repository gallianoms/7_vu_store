import { User } from '@/app/core/interfaces/user/user.interface';
import { Component, Input, OnInit } from '@angular/core';

type UserWithoutAvatar = Omit<User, 'avatar'> & {
  [key: string]: unknown;
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() users: User[] = [];
  columns: string[] = [];
  usersWithoutAvatar: UserWithoutAvatar[] = [];

  ngOnInit(): void {
    if (this.users.length > 0) {
      this.usersWithoutAvatar = this.users.map(user => {
        const { avatar, ...rest } = user;
        return rest;
      });
      this.columns = Object.keys(this.usersWithoutAvatar[0]);
    }
  }
}
