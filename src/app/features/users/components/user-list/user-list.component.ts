import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/models/user.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { MaterialModule } from 'src/app/shared/material.module';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    MaterialModule
  ]
})
export class UserListComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['name', 'email', 'role', 'active', 'actions'];
  
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1, pageSize: number = 10): void {
    this.userService.getUsers(page, pageSize).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.totalItems = response.totalItems;
        this.currentPage = response.currentPage;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Falha ao carregar usuários',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  openUserDialog(user?: User): void {
    console.log('Opening dialog with user data:', user);
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: user ? { ...user } : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(this.currentPage + 1, this.pageSize);
      }
    });
  }

  deleteUser(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Esta ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.loadUsers(this.currentPage + 1, this.pageSize);
            Swal.fire(
              'Excluído!',
              'O usuário foi excluído com sucesso.',
              'success'
            );
          },
          error: () => {
            Swal.fire(
              'Erro!',
              'Não foi possível excluir o usuário.',
              'error'
            );
          }
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers(this.currentPage + 1, this.pageSize);
  }
}