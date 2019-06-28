using Hl7.Fhir.Model;
using Hl7.Fhir.Rest;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Spark.Engine.Core;
using Spark.Engine.Extensions;
using Spark.Engine.Utility;
using Spark.Service;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;

namespace Pasientdata.Api.Controllers
{
    [Route("fhir/[controller]"), ApiController, EnableCors]
    public class ObservationController : ControllerBase
    {
        private const string RESOURCE_TYPE = "Observation";

        private readonly IFhirService _fhirService;

        public ObservationController(IFhirService fhirService)
        {
            _fhirService = fhirService;
        }

        [HttpGet("{id}")]
        public ActionResult<FhirResponse> Read(string id)
        {
            ConditionalHeaderParameters parameters = new ConditionalHeaderParameters(Request);
            Key key = Key.Create(RESOURCE_TYPE, id);
            return _fhirService.Read(key, parameters);
        }

        [HttpPut("{id?}")]
        public ActionResult<FhirResponse> Update(Resource resource, string id = null)
        {
            string versionId = Request.GetTypedHeaders().IfMatch?.FirstOrDefault()?.Tag.Buffer;
            Key key = Key.Create(RESOURCE_TYPE, id, versionId);
            if (key.HasResourceId())
            {
                Request.TransferResourceIdIfRawBinary(resource, id);

                return _fhirService.Update(key, resource);
            }
            else
            {
                return _fhirService.ConditionalUpdate(key, resource,
                    SearchParams.FromUriParamList(Request.TupledParameters()));
            }
        }

        [HttpPost]
        public ActionResult<FhirResponse> Create(Resource resource)
        {
            Key key = Key.Create(RESOURCE_TYPE, resource?.Id);

            if (Request.Headers.ContainsKey(FhirHttpHeaders.IfNoneExist))
            {
                NameValueCollection searchQueryString = HttpUtility.ParseQueryString(Request.GetTypedHeaders().IfNoneExist());
                IEnumerable<Tuple<string, string>> searchValues =
                    searchQueryString.Keys.Cast<string>()
                        .Select(k => new Tuple<string, string>(k, searchQueryString[k]));

                return _fhirService.ConditionalCreate(key, resource, SearchParams.FromUriParamList(searchValues));
            }

            return _fhirService.Create(key, resource);
        }

        [HttpGet]
        public ActionResult<FhirResponse> Search()
        {
            int start = FhirParameterParser.ParseIntParameter(Request.GetParameter(FhirParameter.SNAPSHOT_INDEX)) ?? 0;
            var searchparams = Request.GetSearchParams();

            return _fhirService.Search(RESOURCE_TYPE, searchparams, start);
        }
    }
}