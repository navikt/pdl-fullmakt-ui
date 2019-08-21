import * as React from 'react';
import * as $ from 'jquery';
import { I18n } from 'react-i18nify';
import { connect } from 'react-redux';
import { logout, userInfo } from '../../adal/adal';

interface Props {
  leftMenu?: object;
  content: object;
  pathName?: string;
}
interface State {
  showPopup: boolean;
}

// Toggle the side navigation
const sidebarToggle = (e: any) => {
  e.preventDefault();
  $('body').toggleClass('sidebar-toggled');
  $('.sidebar').toggleClass('toggled');
};

class MainView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showPopup: false
    };
  }

  togglePopup() {
    this.setState(state => ({
      showPopup: state.showPopup ? false : true
    }));
  }

  handleLanguage(l: string) {
    localStorage.setItem('language', l);
    window.location.reload(true);
  }

  menuText = (t1: any, t2: any) => (
    <div>
      <span>{t1}</span>
      <span>{t2}</span>
    </div>
  );

  checked = (language: any) =>
    localStorage.getItem('language') === language && <i className="fa fa-check" />;

  public render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
          <a className="navbar-brand mr-1" href="/about">
            <div> {I18n.t('fullmakt.words.titleFullmakt')} </div>
            <div style={{ fontSize: '12px' }}>
              {' '}
              {I18n.t('fullmakt.words.titleDataGovernanceTools')}{' '}
            </div>
          </a>

          <button
            className="btn btn-link btn-sm text-white order-1 order-sm-0"
            id="sidebarToggle"
            onClick={sidebarToggle}
          >
            <i className="fa fa-bars" />
          </button>

          <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder={I18n.t('fullmakt.words.search.searchFor')}
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-primary" type="button">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </form>

          <ul className="navbar-nav ml-auto ml-md-0" onClick={() => this.togglePopup()}>
            <li
              className={
                'nav-item dropdown no-arrow ' + (this.state.showPopup ? 'show' : '')
              }
            >
              <a
                className="nav-link dropdown-toggle"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup={this.state.showPopup}
                aria-expanded={this.state.showPopup}
              >
                <i className="fa fa-user-circle" />
              </a>
              <div
                className={
                  'dropdown-menu dropdown-menu-right ' +
                  (this.state.showPopup ? 'show' : '')
                }
                aria-labelledby="userDropdown"
              >
                <a className="dropdown-item">{userInfo()}</a>
                <a className="dropdown-item">{I18n.t('fullmakt.words.language')}</a>
                <a className="dropdown-item" onClick={() => this.handleLanguage('no')}>
                  {this.menuText(this.checked('no'), 'NO')}
                </a>
                <a className="dropdown-item" onClick={() => this.handleLanguage('en')}>
                  {this.menuText(this.checked('en'), 'EN')}
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" onClick={e => logout(e)}>
                  {I18n.t('fullmakt.words.logout')}
                </a>
              </div>
            </li>
          </ul>
        </nav>
        <div id="wrapper">
          <ul className="sidebar navbar-nav">{this.props.leftMenu}</ul>

          <div id="content-wrapper">
            <div className="container-fluid">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">{I18n.t('fullmakt.words.home')}</a>
                </li>
                <li className="breadcrumb-item active">{this.PageName()}</li>
              </ol>

              <div className="row">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fa fa-lock" />
                      </div>
                      <div className="mr-5">
                        {'40 ' +
                          I18n.t('fullmakt.pages.accessPolicies.accessPolicies') +
                          '!'}
                      </div>
                    </div>
                    <a
                      className="card-footer text-white clearfix small z-1"
                      href="accessPolicies"
                    >
                      <span className="float-left">
                        {I18n.t('fullmakt.words.viewDetails')}
                      </span>
                      <span className="float-right">
                        <i className="fa fa-angle-right" />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-warning o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fa fa-object-group" />
                      </div>
                      <div className="mr-5">
                        {'365 ' + I18n.t('fullmakt.pages.topics.topics') + '!'}
                      </div>
                    </div>
                    <a
                      className="card-footer text-white clearfix small z-1"
                      href="topics"
                    >
                      <span className="float-left">
                        {I18n.t('fullmakt.words.viewDetails')}
                      </span>
                      <span className="float-right">
                        <i className="fa fa-angle-right" />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fa fa-pencil" />
                      </div>
                      <div className="mr-5">
                        {'143 ' + I18n.t('fullmakt.pages.producers.producers') + '!'}
                      </div>
                    </div>
                    <a
                      className="card-footer text-white clearfix small z-1"
                      href="producers"
                    >
                      <span className="float-left">
                        {I18n.t('fullmakt.words.viewDetails')}
                      </span>
                      <span className="float-right">
                        <i className="fa fa-angle-right" />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fa fa-fw fa-group" />
                      </div>
                      <div className="mr-5">
                        {'289 ' + I18n.t('fullmakt.pages.consumers.consumers') + '!'}
                      </div>
                    </div>
                    <a
                      className="card-footer text-white clearfix small z-1"
                      href="consumers"
                    >
                      <span className="float-left">
                        {I18n.t('fullmakt.words.viewDetails')}
                      </span>
                      <span className="float-right">
                        <i className="fa fa-angle-right" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">{this.PageName()}</div>
                <div className="card-body">{this.props.content}</div>
              </div>
            </div>

            <footer className="sticky-footer">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <div>{I18n.t('fullmakt.words.footerText')}</div>
                  <span style={{ fontWeight: 'bold' }}>
                    {I18n.t('fullmakt.words.version') + ': '}
                  </span>
                  <span>0.2</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }

  private PageName() {
    return (
      this.props.pathName &&
      I18n.t(
        'fullmakt.pages.' +
          this.props.pathName.slice(1) +
          '.' +
          this.props.pathName.slice(1)
      )
    );
  }
}

export default connect((state: any) => ({
  pathName: state.router.location.pathname
}))(MainView);
