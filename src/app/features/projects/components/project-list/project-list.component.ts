import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import { Project, ProjectStatus } from '../../../../shared/models/project.model';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { ThemePalette } from '@angular/material/core';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],

})
export class ProjectListComponent implements OnInit {
  dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>([]);
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'status', 'actions'];
  
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  isAdmin: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(page: number = 1, pageSize: number = 10): void {
    this.projectService.getProjects(page, pageSize).subscribe({
      next: (response) => {
        this.dataSource.data = response.items;
        this.totalItems = response.totalCount;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Falha ao carregar projetos',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProjects(this.currentPage + 1, this.pageSize);
  }

  openProjectDetails(project: Project): void {
    this.dialog.open(ProjectDetailComponent, {
      data: project,
      width: '500px'
    });
  }

  openProjectDialog(project?: Project): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '600px',
      data: project || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.projectService.updateProject(result).subscribe({
            next: (response) => {
              if (response.success) {
                Swal.fire({
                  title: 'Success!',
                  text: response.message || 'Project updated successfully',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false
                });
                this.loadProjects(this.currentPage + 1, this.pageSize);
              } else {
                Swal.fire({
                  title: 'Error!',
                  text: response.message || 'Failed to update project',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
              }
            },
            error: (error) => {
              Swal.fire({
                title: 'Error!',
                text: error.error?.message || 'Failed to update project',
                icon: 'error',
                confirmButtonText: 'Ok'
              });              
            }
          });
        } else {
          this.projectService.createProject(result).subscribe({
            next: (response) => {
              if (response.success) {
                Swal.fire({
                  title: 'Success!',
                  text: response.message || 'Project created successfully',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false
                });
                this.loadProjects(this.currentPage + 1, this.pageSize);
              } else {
                Swal.fire({
                  title: 'Error!',
                  text: response.message || 'Failed to create project',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                });
              }
            },
            error: (error) => {
              Swal.fire({
                title: 'Error!',
                text: error.error?.message || 'Failed to create project',
                icon: 'error',
                confirmButtonText: 'Ok'
              });              
            }
          });
        }
      }
    });
  }

  deleteProject(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this project!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.deleteProject(id).subscribe({
          next: (response) => {
            if (response.success) {
              Swal.fire({
                title: 'Deleted!',
                text: response.message || 'Project has been deleted.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
              });
              this.loadProjects(this.currentPage + 1, this.pageSize);
            } else {
              Swal.fire({
                title: 'Error!',
                text: response.message || 'Failed to delete project',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }
          },
          error: (error) => {
            Swal.fire({
              title: 'Error!',
              text: error.error?.message || 'Failed to delete project',
              icon: 'error',
              confirmButtonText: 'Ok'
            });            
          }
        });
      }
    });
  }

  getStatusColor(status: string): ThemePalette {  
    switch (status) {
      case 'NotStarted':
        return 'default' as ThemePalette;
      case 'InProgress':
        return 'primary';
      case 'OnHold':
        return 'warn';
      case 'Completed':
        return 'accent';
      case 'Cancelled':
        return 'warn';
      default:
        return 'default' as ThemePalette;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}