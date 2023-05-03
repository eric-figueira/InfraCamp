import React from 'react';
import { useGet } from '../../hooks/useGet'

import "./Usuario.css";

const ProfilePage: React.FC = () => {
    return (
        <div>
            <div className="card">
                <div className="left">
                    <img src="./img/profilePhoto.jpg" alt="user" width="100" />
                    <h4>Kanye West</h4>
                    <p>Senha: ********</p>
                    <p>Tel: +55 19995258974</p>
                    <p>Email: kanyeye@secmail.com</p>

                    <div className="button">
                        <input type="button" value="Update" />
                        <input type="button" value="Delete" />
                    </div>

                </div>
                <div className="right">
                    <div className="info">
                        <h3>01/05/2023</h3>
                        <div className="info-data">
                            <div className="info-info">
                                <h4>Info: Buraco</h4>
                                <h4>Status: Em análise</h4>
                            </div>

                            <div className="more-info">
                                <input type="button" value="Mais informações" />
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <h3>11/04/2023</h3>
                        <div className="info-data">
                            <div className="info-info">
                                <h4>Info: Poste caído</h4>
                                <h4>Status: Concluido</h4>
                            </div>

                            <div className="more-info">
                                <input type="button" value="Mais informações" />
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <h3>05/04/2023</h3>
                        <div className="info-data">
                            <div className="info-info">
                                <h4>Info: Acumulo de lixo</h4>
                                <h4>Status: Concluido</h4>
                            </div>

                            <div className="more-info">
                                <input type="button" value="Mais informações" />
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <h3>05/04/2023</h3>
                        <div className="info-data">
                            <div className="info-info">
                                <h4>Info: Buraco</h4>
                                <h4>Status: Concluido</h4>
                            </div>

                            <div className="more-info">
                                <input type="button" value="Mais informações" />
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <h3>05/04/2023</h3>
                        <div className="info-data">
                            <div className="info-info">
                                <h4>Info: Poste caído</h4>
                                <h4>Status: Não resolvido</h4>
                            </div>

                            <div className="more-info">
                                <input type="button" value="Mais informações" />
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <h3>05/04/2023</h3>
                        <div className="info-data">
                            <div className="info-info">
                                <h4>Info: Acumulo de lixo</h4>
                                <h4>Status: Em análise</h4>
                            </div>

                            <div className="more-info">
                                <input type="button" value="Mais informações" />
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <h3>05/04/2023</h3>
                        <div className="info-data">
                            <div className="info-info">
                                <h4>Info: Buraco</h4>
                                <h4>Status: Em análise</h4>
                            </div>

                            <div className="more-info">
                                <input type="button" value="Mais informações" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ProfilePage;