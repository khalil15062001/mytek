import React, { } from "react";
import './Home.css';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report } from 'powerbi-client';

export default function Home() {
	return (
		<div className="content-wrapper">
			<div className="content-header">
				<div className="container-fluid" >


					<div className="powerbi">

						<PowerBIEmbed
							embedConfig={{
								type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
								id: '55710e9b-260b-4ef6-9a86-9a7a81363e7d',
								embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=55710e9b-260b-4ef6-9a86-9a7a81363e7d&groupId=f8b0354f-61cc-47e6-9967-4d0ec98d8786&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUFGUklDQS1OT1JUSC1BLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
								accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyIsImtpZCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZGU1ZjE1ZDUtYTRlNi00MjYyLThmNzgtMTFkYTg3Yjg2MTIwLyIsImlhdCI6MTc1MTk3NzkyNSwibmJmIjoxNzUxOTc3OTI1LCJleHAiOjE3NTE5ODIxMTQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVVFBdS84WkFBQUFycnh6d0dnZ2NwbzVpTnRRVzhWZ21BUlh5S0VPUVhXYit0eWhNd3RKcEZFdDlUQ1VNdzBoajdwOGlEbnMvZ1A0OHFiRzV0YUdEeHJDRWRlZndFbnhnZz09IiwiYW1yIjpbInB3ZCIsInJzYSJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImRldmljZWlkIjoiM2NjNWJjZmItOWUxZC00N2JiLWIzNWUtZjU5YjkyMGY4ZTEzIiwiZmFtaWx5X25hbWUiOiJDaGFhYmVuIiwiZ2l2ZW5fbmFtZSI6IlJhYmlhYSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE5Ni4xNzkuMjIxLjE4IiwibmFtZSI6IlJhYmlhYSBDaGFhYmVuIiwib2lkIjoiMTMzNGIwYjktY2M0Ni00ZmU5LTgwZTEtZDA3YWNjNTk0NmRjIiwicHVpZCI6IjEwMDMyMDAxQkZFNTJEQzEiLCJyaCI6IjEuQVVnQTFSVmYzdWFrWWtLUGVCSGFoN2hoSUFrQUFBQUFBQUFBd0FBQUFBQUFBQUJJQUR0SUFBLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZCI6IjAwNmMxMDI5LTZjYTMtMDY2NC04NTNjLWVmYTcwZWEzMWI1MyIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6InROdWxPWC1pVU1VWmZhdVVJQlRWbTRxMHB4TC1sTS1Td0FuWHZxelRCZmciLCJ0aWQiOiJkZTVmMTVkNS1hNGU2LTQyNjItOGY3OC0xMWRhODdiODYxMjAiLCJ1bmlxdWVfbmFtZSI6ImJpQE15dGVrLnRuIiwidXBuIjoiYmlATXl0ZWsudG4iLCJ1dGkiOiJJUlJiLS1ra2RVLTJ3Q1l3OWN3NkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2Z0ZCI6Ii1NTlJlUnpiTFFXVVZkOHRTYkxwYmFVMTVKZzZ0dmdpY2oyU1VBLUZGVThCYzNkbFpHVnVZeTFrYzIxeiIsInhtc19pZHJlbCI6IjI2IDEifQ.AoJRDi_oNPewFZbPzre_KitlLL3bwnyU8cpN3DPwXQODwTJNY5jNH8us0e71bLdT6MT5rm9MyGtZDEuUWcrUZQjrtyi7UTfPCKE0JG7NUBMXFbrtAxsRHAS2_t8SlMfQlSdjWGehMKbjWH3ShXqIx31plfEUP2Pgpu_UBwyswmIk3E5E2JjHfScPl0JkoYvibm_w9_ukbdue9m2EJeFdMXFOZJQhHpyIX_78QMb3GnK4pSKx8uASRjC5feLeAiiiMn03hAPzoPDu1679iQNTgnxwhFoPJr43FRWp_UQaKIw6OWEpe_4IYD-_Au4pLCb8f2WUdPwy_Sll4389fwE_Xw',
								tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
								settings: {
									panes: {
										filters: {
											expanded: false,
											visible: false
										}
									},
									background: models.BackgroundType.Transparent,
								}
							}}

							eventHandlers={
								new Map([
									['loaded', function () { console.log('Report loaded'); }],
									['rendered', function () { console.log('Report rendered'); }],
									['error', function (event) { console.log(event.detail); }],
									['visualClicked', () => console.log('visual clicked')],
									['pageChanged', (event) => console.log(event)],
								])
							}

							cssClassName={"reportClass"}

							getEmbeddedComponent={(embeddedReport) => {
								window.report = embeddedReport;
							}}
						/>
					</div>
				</div>
			</div>
		</div>

	);

}

