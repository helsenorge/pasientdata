using Hl7.Fhir.Model;
using Hl7.Fhir.Utility;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Spark.Engine.Core;
using Spark.Engine.Extensions;
using Spark.Engine.Utility;
using Spark.Service;

namespace Pasientdata.Api.Controllers
{
    [Route("fhir/[controller]"), ApiController, EnableCors]
    public class PatientController : ControllerBase
    {
        private readonly IFhirService _fhirService;

        public PatientController(IFhirService fhirService)
        {
            _fhirService = fhirService;
        }

        [HttpGet("{id}")]
        public ActionResult<FhirResponse> Read(string id)
        {
            ConditionalHeaderParameters parameters = new ConditionalHeaderParameters(Request);
            Key key = Key.Create(ResourceType.Practitioner.GetLiteral(), id);
            return _fhirService.Read(key, parameters);
        }

        [HttpGet]
        public ActionResult<FhirResponse> Search()
        {
            int start = FhirParameterParser.ParseIntParameter(Request.GetParameter(FhirParameter.SNAPSHOT_INDEX)) ?? 0;
            var searchparams = Request.GetSearchParams();

            return _fhirService.Search(ResourceType.Practitioner.GetLiteral(), searchparams, start);
        }
    }
}