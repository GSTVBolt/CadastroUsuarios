// UserCrud.jsx
import React, { Component } from 'react';
import Main from '../template/Main';
import { getUsers, saveUser, deleteUser } from '../../api';

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!',
};

const initialState = {
    user: { name: '', email: '' },
    list: [],
};

export default class UserCrud extends Component {
    state = { ...initialState };

    async componentDidMount() {
        try {
            const userList = await getUsers();
            this.setState({ list: userList });
        } catch (error) {
            console.error('Erro ao carregar a lista de usuários:', error);
        }
    }

    clear = () => {
        this.setState({ user: { name: '', email: '' } });
    };

    save = async () => {
        const { user } = this.state;

        try {
            const updatedUser = await saveUser(user);
            const list = this.getUpdatedList(updatedUser);
            this.setState({ user: { name: '', email: '' }, list });
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    };

    getUpdatedList = (updatedUser, add = true) => {
        const { list } = this.state;
        return add ? [updatedUser, ...list.filter((u) => u.id !== updatedUser.id)] : list.filter((u) => u.id !== updatedUser.id);
    };

    updateField = (event) => {
        const user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    };

    renderForm = () => {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    load = (user) => {
        this.setState({ user });
    };

    remove = async (user) => {
        try {
            await deleteUser(user.id);
            const list = this.getUpdatedList(user, false);
            this.setState({ list });
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    };

    renderTable = () => {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    };

    renderRows = () => {
        return this.state.list.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    };

    render() {
        return <Main {...headerProps}>{this.renderForm()}{this.renderTable()}</Main>;
    }
}
