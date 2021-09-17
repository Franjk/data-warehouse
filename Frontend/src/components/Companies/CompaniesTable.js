import { Component } from '../../libs/xQuery/xQuery.js';
import CompaniesTableRow from './CompaniesTableRow.js';

class CompaniesTable extends Component {
  constructor(parentEl, props) {
    super(document.createElement('table'));
    this.addClass('table');
    this.state = { 
      rowsPerPage: 10,
      page: 1,
      data: [],
      orderBy: { field: 'name', direction: 'asc' },
      filter: '',
      ...props,
    };
    this.children = [];

    this.render();
    parentEl.appendChild(this.$);
  }

  render() {
    this.$.innerHTML = `
      <table class="table mb-16">
        <thead>
          <tr >
            <th>
              <input type="checkbox" name="" id="table-chk" class="master-chk">
            </th>
            <th style="width:200px;">
              <span>
                Nombre 
                <span class="material-icons action-icon" data-select="btn-order-name">swap_vert</span>
              </span>
            </th>

            <th>
              <span>
                Email 
                <span class="material-icons action-icon" data-select="btn-order-email">swap_vert</span>
              </span>
            </th>

            <th>
              <span>
                Teléfono 
                <span class="material-icons action-icon" data-select="btn-order-phoneNumber">swap_vert</span>
              </span>
            </th>

            <th style="width:200px;">
              <span>
                Dirección
                <span class="material-icons action-icon" data-select="btn-order-address">swap_vert</span>
              </span>
            </th>
            <th>
              <span>
                Ciudad
                <span class="material-icons action-icon" data-select="btn-order-city">swap_vert</span>
              </span>
            </th>

            <th>
              <span>
                País/Región
                <span class="material-icons action-icon" data-select="btn-order-country">swap_vert</span>
              </span>
            </th>

            <th>
              <span class="justify-content-center">
                Acciones
                </span>
            </th>
          </tr>
        </thead>
        <tbody id="tbody" data-anchor="table-body">
          <!-- Aqui se inyectan cada una de las filas de la tabla -->
        </tbody>
      </table>
    `;

    this.children = [];

    const { field: orderField, direction } = this.state.orderBy;
    
    this.state.data
      .filter(el => {
        let isIncluded = false;
        for (let prop in el) {
          const propVal = el[prop] ?? '';
          const strPropVal = propVal.toString().toUpperCase();
          if (strPropVal.includes(this.state.filter.toUpperCase())) {
            isIncluded = true;
            break;
          }
        }
        return isIncluded;

      })
      .sort((a, b) => {
        if (a[orderField] > b[orderField]) return direction === 'asc' ? 1 : -1;
        if (a[orderField] < b[orderField]) return direction === 'asc' ? -1 : 1;
        return 0;

      })
      .slice(
        (this.state.page - 1) * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage
      )
      .forEach(cd => {
        this.children.push(
          new CompaniesTableRow(
            this.$.querySelector('[data-anchor="table-body"]'), 
            {...cd}
          )
        );
      });

    const btnOrderName = this.$.querySelector('[data-select="btn-order-name"]');
    const btnOrderAddress = this.$.querySelector('[data-select="btn-order-address"]');
    const btnOrderCity = this.$.querySelector('[data-select="btn-order-city"]');
    const btnOrderCountry = this.$.querySelector('[data-select="btn-order-country"]');

    btnOrderName.addEventListener('click', () => this.reorderTable('name'));
    btnOrderAddress.addEventListener('click', () => this.reorderTable('address'));
    btnOrderCity.addEventListener('click', () => this.reorderTable('city'));
    btnOrderCountry.addEventListener('click', () => this.reorderTable('country'));

    document.dispatchEvent(new CustomEvent('update-count-selected-tag'));
    document.dispatchEvent(new CustomEvent('update-current-rows', { detail: { startRow: this.startRow, endRow: this.endRow }}));
    document.dispatchEvent(new CustomEvent('update-total-rows', { detail: { totalRows: this.totalRows }}));
  }

  syncState() {
    if (this.children.lentgth > 0) {
      this.state.data = [
        ...this.state.data,
        ...this.children.map(c => c.state),
      ];
    }
  }

  reorderTable(columnName) {
    let newDirection = 'asc';
    if (this.state.orderBy.field === columnName 
      && this.state.orderBy.direction === 'asc') {
      newDirection = 'desc';
    }

    this.setState({
      orderBy: {
        field: columnName,
        direction: newDirection,
      }
    });
  }

  switchPage(page) {
    
    const rowCount = this.state.data.length;
    const maxPage = Math.ceil(rowCount / this.state.rowsPerPage);

    if (page === 'previous') {
      if (this.state.page === 1) return;
      console.log('previous');
      this.setState({
        page: this.state.page - 1,
      });
      
      
    } else if (page === 'next') {
      if (this.state.page === maxPage) return;
      this.setState({
        page: this.state.page + 1,
      });


    } else if (page >= 1 && page <= maxPage) {
      this.setState({
        page: Number(page),
      });

    }

    document.dispatchEvent(new CustomEvent('update-current-rows', { detail: { startRow: this.startRow, endRow: this.endRow }}));
  }

  get startRow() {
    return (this.state.page - 1) * this.state.rowsPerPage + 1;
  }

  get endRow() {
    return Math.min(this.state.page * this.state.rowsPerPage, this.state.data.length);
  }

  get totalRows() {
    return this.state.data.length;
  }

  get selectedRows() {
    return this.children
      .map(child => child.state)
      .filter(child => child.selected);
  }
}

export default CompaniesTable;
