import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../service/data-storage.service';
import { AuthService } from '../service/aut.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription | undefined;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService,
  ) {}

  onSaveDate() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user?.token;
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
