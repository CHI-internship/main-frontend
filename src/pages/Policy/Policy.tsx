import { FC } from 'react';

import style from './Policy.module.scss';

const Policy: FC = () => (
  <div className={style.container_policy}>
    <h1>Rules for using the KraudeDonate Service</h1>
    <h4>1.Terms</h4>
    <p>
      1.1.These rules define the procedure for using the KraudeDonate
      Service (hereinafter - the Rules) and are mandatory for all participants
      of the Electronic document flow and EDI.
    </p>
    <h4>2. Definition of basic terms and concepts</h4>
    <p>
      2.1.<b>API (English Application Programming Interface)</b> is an application programming
      interface
      in the form of a set of tools and rules that enable interaction between individual
      components
      of the Service.
    </p>
    <p>2.2.<b>EDI (Electronic data interchange)</b> is an electronic data exchange that allows the
      exchange
      between the Supplier and the Network of logistical, commercial and financial information
      in the form of standard, structured electronic messages.
    </p>
    <p>2.3.<b>EDI document</b> – structured electronic messages that are exchanged
      between the Supplier and the Network during their business activities
      (order, order confirmation, shipment notification, acceptance notification, etc.).
    </p>
    <p>
      2.4.<b>The web interface</b> is a set of means by which the User interacts with the website of
      the
      Service through a browser.
    </p>
    <p>
      2.5.<b>Visitor</b> – any person has the right to use open informational sections of the
      Service,
      which are available without registration.
    </p>
    <p>
      2.6.<b>The initiator of the signing</b> is a participant of the Electronic document
      circulation, who
      creates a document, uploads it to the Service and sends it to the Counterparty for signature.
    </p>
    <p>
      2.7.<b>Integration</b>Integration – provision of instructions and access to the API and/or
      configuration of
      additional modules or processes for the interaction of the Users information systems and the
      Service.
    </p>
    <p>
      <h4>3.Connection of the Service User</h4>
      <ul>
        3.1. Before starting to use the Service, the Service User must:
      </ul>
      <br />
      <li>
        3.1.1. Familiarize yourself with these Rules, accept them and comply with them while using
        the Service;
      </li>
      <li>
        3.1.2 Read the Privacy Policy, accept it and comply with it when using the Service;
      </li>
      <li>
        3.1.3. Have a qualified public key certificate valid for use, issued by a qualified provider
        electronic trust services (hereinafter - the qualified provider) in accordance with the
        legislation of Ukraine;
      </li>
      <li>
        3.1.4. Register at https:localhost/5200/auth/registration and/or
        https://edi.vchasno.ua/app/deals.
      </li>
    </p>
    <h4>4.Fee for using the Service</h4>
    <p>
      4.1. The fee for the use of the EDI Service when sending EDI documents is paid by the User
      (Supplier)
      in accordance with the Tariffs posted at the link https://edi.vchasno.com.ua/#rec85469990,
      unless otherwise specified in the Agreement concluded between the Service Operator and By the
      User
      (Provider) or the User (Network).
    </p>
    <p>
      4.2. The fee for using the EDI Service when sending EDI documents created through the Web
      interface
      is paid from the Uses (Supplies) bonus account.
    </p>
    <h4>5.Final provisions</h4>
    <p>
      5.1. Rules in the new edition, as specified in clause 6.1. enter into force from the moment
      of posting on the relevant web page of the Service.
    </p>
    <p>
      5.2. Possibilities of signing documents addressed to participants of the Electronic document
      flow,
      EDI and the list of actions that such participants need to perform for this, including the
      registration procedure in accordance with clause 3.1.4 of the Rules;
    </p>
    <p>
      5.3. A reminder, including a repeat one, about the presence of sent Electronic documents,
      EDI documents from other participants of the Electronic document flow, EDI awaiting signature.
    </p>
  </div>
);

export default Policy;