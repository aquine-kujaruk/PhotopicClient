import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
	@Input() placeholder: string;
	@Output() searchText = new EventEmitter<string>();
	@Output() searchCancel = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	onSearchChange(event) {
		this.searchText.emit(event.detail.value);
	}

	onSearchCancel() {
		this.searchCancel.emit();
	}
}
