import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {Categories} from 'src/app/enumerators/app.enum';
import {CategoriesOptionsService} from 'src/app/services/categories-options.service';
import {AppState} from 'src/app/store/app.reducer';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
	@ViewChild(IonSlides, {static: true}) slides: IonSlides;
	@Input() categories: Categories;
	@Input() selectedCategory: string;
	@Output() changeCategory = new EventEmitter<string>();

	slideOpts: any;

	private platformSubs: Subscription;

	constructor(
		private _store: Store<AppState>,
		private _categoriesOptionsService: CategoriesOptionsService,
	) {}

	ngOnInit() {
		this.platformSubs = this._store.select('platform').subscribe((state) => {
			this.slideOpts = this._categoriesOptionsService.setSlidesOtions(
				state.breakpoint,
			);
		});
	}

	slideChange(index, category: Categories) {
		this.slides.slideTo(index);
		this.changeCategory.emit(category);
	}

	ngOnDestroy() {
		this.platformSubs.unsubscribe();
	}
}
