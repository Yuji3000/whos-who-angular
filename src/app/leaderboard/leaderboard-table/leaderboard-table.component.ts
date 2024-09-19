import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { LeaderboardTableDataSource, LeaderboardTableItem } from './leaderboard-table-datasource';

@Component({
  selector: 'app-leaderboard-table',
  templateUrl: './leaderboard-table.component.html',
  styleUrl: './leaderboard-table.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class LeaderboardTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LeaderboardTableItem>;

  loading = true;
  private _data!: LeaderboardTableItem[];

  @Input({ required: true })
  set data(data: LeaderboardTableItem[]) {
    this._data = data;

    if (this.loading) return;

    this.dataSource = new LeaderboardTableDataSource(data);
    this.setupTable();
  }

  dataSource!: LeaderboardTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['rank', 'name', 'questionsAnswered', 'score'];

  ngOnInit(): void {
    this.dataSource = new LeaderboardTableDataSource(this._data);
  }

  ngAfterViewInit(): void {


    this.setupTable();
    this.loading = false;
  }

  private setupTable() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
