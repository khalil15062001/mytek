import React from "react";
import "./Home.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export default function PowerBIPage() {
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid" >
                    <div className="powerbi-container">
                        <PowerBIEmbed
                            embedConfig={{
                                type: "report",
                                id: "55710e9b-260b-4ef6-9a86-9a7a81363e7d",
                                embedUrl:
                                    "https://app.powerbi.com/reportEmbed?reportId=55710e9b-260b-4ef6-9a86-9a7a81363e7d&groupId=f8b0354f-61cc-47e6-9967-4d0ec98d8786",
                                accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyIsImtpZCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZGU1ZjE1ZDUtYTRlNi00MjYyLThmNzgtMTFkYTg3Yjg2MTIwLyIsImlhdCI6MTc1MjIyNTc0NSwibmJmIjoxNzUyMjI1NzQ1LCJleHAiOjE3NTIyMjk2ODQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVVFBdS84WkFBQUFTOFBHWjBoMFB3cjMrVUFMZzVtaDVPS2lacHpFRVFIZ0E3YWhOMTVlQ2tIUG9ZSVh3YlRSb2ZJeUtmbmo1VWpsS2l0STV2eTlzeHNYUXZCTVB0Ym1rQT09IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQ2hhYWJlbiIsImdpdmVuX25hbWUiOiJSYWJpYWEiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxOTYuMTc5LjIyMS4xOCIsIm5hbWUiOiJSYWJpYWEgQ2hhYWJlbiIsIm9pZCI6IjEzMzRiMGI5LWNjNDYtNGZlOS04MGUxLWQwN2FjYzU5NDZkYyIsInB1aWQiOiIxMDAzMjAwMUJGRTUyREMxIiwicmgiOiIxLkFVZ0ExUlZmM3Vha1lrS1BlQkhhaDdoaElBa0FBQUFBQUFBQXdBQUFBQUFBQUFCSUFEdElBQS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWQiOiIwMDZjODU1OS0wZTAzLTIzZDYtNDNhNS02NTVjMmVhZjQ1M2YiLCJzdWIiOiJ0TnVsT1gtaVVNVVpmYXVVSUJUVm00cTBweEwtbE0tU3dBblh2cXpUQmZnIiwidGlkIjoiZGU1ZjE1ZDUtYTRlNi00MjYyLThmNzgtMTFkYTg3Yjg2MTIwIiwidW5pcXVlX25hbWUiOiJiaUBNeXRlay50biIsInVwbiI6ImJpQE15dGVrLnRuIiwidXRpIjoiem13bUhBS2xra2FPTzFuUndGSTNBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19mdGQiOiI5Ukhmcm9xRWhfMlhsVDQ0ZGRuR1JPcngtSzYyOVJKZmkzZkxRNUVPaUZvQlpuSmhibU5sWXkxa2MyMXoiLCJ4bXNfaWRyZWwiOiIxNCAxIn0.EAQfX7L7a55K_9RPPC_UAB0JDdNrd2oq3mOz7SwxEHzl_tFU8G22i0FPo1gt64ydDWeo__D3_fQnkF2hFPVDN3M-OeN4l5ZfSSwyrHVMApsM8H5Xw3TjEj597dq8I7zrarPiOJtheFwyt-lhELoS6MOrMhHUTqdFjMNbCIJdTmh3jGRuo-JiPMwUWOy1Ul67R79M9EqAQ-HbalPVCP-ILH4I5NRktY5WHT8P8pzywq0ZsqxDRg0BAyv6KnH_Nyajjofx5koTQsxRB0IdcSwaQ7BLa7_xVQ6x6Hm8Jee3rXIA0KZXIKpOCkiiA5OAWeALSX2IS6u8dtMw2JhopqMcVA",
                                tokenType: models.TokenType.Aad,
                                settings: {
                                    panes: {
                                        filters: {
                                            expanded: false,
                                            visible: false,
                                        },
                                    },
                                    background: models.BackgroundType.Transparent,
                                },
                            }}
                            eventHandlers={
                                new Map([
                                    ["loaded", () => console.log("Report loaded")],
                                    ["rendered", () => console.log("Report rendered")],
                                    ["error", (event) => console.error("Power BI error:", event.detail)],
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
